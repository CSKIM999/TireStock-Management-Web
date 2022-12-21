const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("Proxy Work!");
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:5000",
      secure: false,
      changeOrigin: true,
    })
  );
};
