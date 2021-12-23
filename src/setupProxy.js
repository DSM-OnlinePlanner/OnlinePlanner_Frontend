const createProxyMiddleware = require("http-proxy-middleware");
const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://220.90.237.33:7070",
      changeOrigin: true,
      pathRewrite: {
        "^/api": `${PROXY}`,
      },
    })
  );
};
