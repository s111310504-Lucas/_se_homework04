from main import parse_headers

def test_parse_headers_single():
    raw_headers = ["Content-Type: application/json"]
    result = parse_headers(raw_headers)
    assert result == {"Content-Type": "application/json"}

def test_parse_headers_multiple():
    raw_headers = [
        "Content-Type: application/json",
        "Authorization: Bearer token123"
    ]
    result = parse_headers(raw_headers)
    assert result == {
        "Content-Type": "application/json",
        "Authorization": "Bearer token123"
    }

def test_parse_headers_empty():
    assert parse_headers(None) == {}
    assert parse_headers([]) == {}
