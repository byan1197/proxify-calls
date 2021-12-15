require("dotenv").config();
const { getPhotos } = require("./services/google-helper");
const { getSoompiFeed } = require("./services/rss-feed");
const { getCurrentWeather } = require("./services/weather");
const express = require("express");
const morgan = require("morgan");
// const { createProxyMiddleware } = require("http-proxy-middleware");

// Create Express Server
const app = express();

// Configuration
const PORT = process.env.PORT || process.env.port || 3000;
const HOST = process.env.host || "localhost";
app.use(morgan("dev"));

app.use("", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.headers.api_key && req.headers.api_key === process.env.api_key) {
    next();
  } else {
    res.sendStatus(403);
  }
});

app.get("/photos", async (req, res) => {
  try {
    const photos = await getPhotos();
    return res.status(200).json(photos);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
});

app.get("/rss-feed", async (req, res) => {
  try {
    const feed = await getSoompiFeed();
    return res.status(200).json(feed);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
});

app.get("/weather", async (req, res) => {
  try {
    const weather = await getCurrentWeather();
    console.log("weat", weather);
    return res.status(200).json(weather);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
