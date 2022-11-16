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
router.get("/", (req, res) => {
  const tire_type = req.query.type;
  const tire_size = +req.query.size;
  const tire_width = +req.query.width;
  const tire_profile = +req.query.profile;
  const tire_condition = +req.query.condition;
  // writer 정보는 주고싶지 않음.
  Tire.find({
    type: tire_type,
    size: tire_size ? tire_size : { $gt: 0 },
    width: tire_width ? tire_width : { $gt: 0 },
    profile: tire_profile ? tire_profile : { $gt: 0 },
    condition: tire_condition ? tire_condition : { $gt: 0 },
  })
    .select("title size width profile condition type")
    .exec((err, body) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, payload: body });
    });
});
router.get("/test?", (req, res) => {
  const user_id = req.query.name;
  const tire_type = req.query.type;
  return res.status(400).json({ user_id, tire_type });
});

module.exports = router;
