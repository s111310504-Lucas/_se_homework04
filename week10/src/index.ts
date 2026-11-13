export interface StorageAdapter {
    get(key: string): Promise<string | null> | string | null;
    put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void> | void;
}

export interface RateLimiterOptions {
    /** 時間窗口內的請求上限 */
    limit: number;
    /** 時間窗口長度（秒） */
    windowSeconds: number;
    /** 儲存引擎：預設為記憶體（適用於單機 Node.js），可傳入 Cloudflare KV Namespace */
    storage?: StorageAdapter;
    /** Key 前綴 */
    prefix?: string;
}

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetAt: number;
}

/** 預設的記憶體儲存（適合本機開發或單一 Node.js 執行個體） */
class MemoryStorage implements StorageAdapter {
    private store = new Map<string, { value: string; expiresAt: number }>();

    get(key: string): string | null {
        const item = this.store.get(key);
        if (!item) return null;
        if (Date.now() > item.expiresAt) {
            this.store.delete(key);
            return null;
        }
        return item.value;
    }

    put(key: string, value: string, options?: { expirationTtl?: number }): void {
        const ttlMs = (options?.expirationTtl ?? 60) * 1000;
        this.store.set(key, { value, expiresAt: Date.now() + ttlMs });
    }
}

export class EdgeRateLimiter {
    private limit: number;
    private windowSeconds: number;
    private storage: StorageAdapter;
    private prefix: string;

    constructor(options: RateLimiterOptions) {
        this.limit = options.limit;
        this.windowSeconds = options.windowSeconds;
        this.storage = options.storage ?? new MemoryStorage();
        this.prefix = options.prefix ?? 'rl:';
    }

    /**
     * 檢查指定識別碼（如 IP 或 User ID）是否允許通過請求
     */
    async check(identifier: string): Promise<RateLimitResult> {
        const now = Math.floor(Date.now() / 1000);
        const windowStart = Math.floor(now / this.windowSeconds) * this.windowSeconds;
        const resetAt = windowStart + this.windowSeconds;
        const key = `${this.prefix}${identifier}:${windowStart}`;

        const raw = await this.storage.get(key);
        const currentCount = raw ? parseInt(raw, 10) : 0;

        if (currentCount >= this.limit) {
            return {
                allowed: false,
                remaining: 0,
                resetAt,
            };
        }

        const nextCount = currentCount + 1;
        await this.storage.put(key, String(nextCount), {
            expirationTtl: this.windowSeconds + 5,
        });

        return {
            allowed: true,
            remaining: Math.max(0, this.limit - nextCount),
            resetAt,
        };
    }
}