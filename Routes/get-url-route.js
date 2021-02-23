const express = require("express");
const router = express.Router();
const UrlDB = require("../models/url-model-db");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const url = await UrlDB.findOne({ tinyUrl: id });

    if (url == null) {
      return res.status(401).json({ message: "Invalid short url" });
    } else {
      return res.redirect(url.longUrl);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server Error Try Again Later", error: err });
  }
});

module.exports = router;
