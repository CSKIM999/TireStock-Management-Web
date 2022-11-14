const express = require("express");
const router = express.Router();

const { Tire } = require("../models/Tire");

router.post("/", (req, res) => {
  const tire = new Tire(req.body);
  tire.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});
router.get("/used", (req, res) => {
  // writer 정보는 주고싶지 않음.
  Tire.find({ type: "used" })
    .select("title size width profile condition type")
    .exec((err, data) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, data });
    });
});
router.post("/test/:_id", (req, res) => {
  const user_id = req.params._id;
  const tire = new Tire(req.body);
  return res.status(400).json({ tire, user_id });
});

module.exports = router;
