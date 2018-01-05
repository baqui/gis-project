var path = require("path");
var express = require("express");
var webpack = require("webpack");
var cookieParser = require("cookie-parser");

const app = express(),
      NODE_ENV = process.env.NODE_ENV || 'development';
      DIST_DIR  = path.join(__dirname, "..", "dist"),
      HOME_HTML_FILE = path.join(DIST_DIR, "index.html"),
      COMMUNICATOR_HTML_FILE = path.join(DIST_DIR, "communicator", "index.html"),

      PRODUCTION_BUILD = process.env.NODE_ENV === "production",
      PRODUCTION_API = process.env.API_ENV === "production",
      DEFAULT_PORT  = 3000;

app.set("port", process.env.PORT || DEFAULT_PORT);

if (PRODUCTION_BUILD) {
  app.use(cookieParser());
  app.use(express.static(DIST_DIR, { maxAge: '30d' }));
  app.get("/communicator*", (req, res) => res.sendFile(COMMUNICATOR_HTML_FILE));
  app.get("*", (req, res) => res.sendFile(HOME_HTML_FILE));
}

app.listen(app.get("port"), '0.0.0.0', function onStart(err) {
  if (err) { console.log(err); }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', app.get("port"), app.get("port"));
});
