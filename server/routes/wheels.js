const express = require("express");
const router = express.Router();

const { Wheel } = require("../models/Wheel");

router.post("/", (req, res) => {
  const wheel = new Wheel(req.body);
  wheel.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
