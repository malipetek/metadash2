const Resources = require("./resources");

test('There are a lot of resources', () => {
    expect(Resources.resources.length).toBeGreaterThan(4000);
});

test('resources.filter supports by HVT-ID', () => {
    expect(Resources.filter(r => r["id"] === "HVT-1234").length).toEqual(1)
});