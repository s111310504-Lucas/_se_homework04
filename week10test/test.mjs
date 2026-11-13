import { EdgeRateLimiter } from '@s111310504/cf-edge-limiter';

// 設定每 10 秒最多允許 2 次請求
const limiter = new EdgeRateLimiter({
    limit: 2,
    windowSeconds: 10,
});

console.log('第 1 次請求:', await limiter.check('192.168.1.1'));
console.log('第 2 次請求:', await limiter.check('192.168.1.1'));
console.log('第 3 次請求:', await limiter.check('192.168.1.1'));