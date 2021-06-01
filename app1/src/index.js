window.app2Url = "http://localhost:3002/static";
(async function  () {
    const publicPath = await import("app2/setPublicPath");
    publicPath.set("http://localhost:3002/static/");
    import("./bootstrap.js");
})();
