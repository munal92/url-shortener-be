const express = require("express");
const router = express.Router();
const UrlDB = require("../models/url-model-db");
const shortId = require("shortid");
const checkUrl = require("valid-url");

router.post("/", async (req, res) => {
  const urlLink = req.body;
  const urlreq = req.protocol + "://" + req.get("host");

  if (!checkUrl.isUri(urlreq) || !checkUrl.isUri(urlLink.longUrl)) {
    return res.status(401).json({ message: "Invalid URL", error: err });
  }

  const tinyUrl = shortId.generate();

  try {
    let url = await UrlDB.findOne({ longUrl: urlLink.longUrl });
    if (url) {
      res.status(200).json({ message: "Successful", url });
    } else {
      url = new UrlDB({
        longUrl: urlLink.longUrl,
        shortUrl: urlreq + "/" + tinyUrl,
        tinyUrl: tinyUrl,
      });
      await url.save();
      res.status(200).json({ message: "Successful", url });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server Error Try Again Later", error: err });
  }
});

module.exports = router;
