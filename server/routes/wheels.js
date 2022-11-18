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

router.get("/", (req, res) => {
  const wheel_type = req.query.type;
  const wheel_from = req.query.from;
  const wheel_design = req.query.design;
  const wheel_size = +req.query.size;
  const wheel_keyword = req.query.keyword;

  Wheel.find({
    type: wheel_type,
    from: wheel_from ? wheel_from : { $gt: 0 },
    design: wheel_design ? wheel_design : { $gt: 0 },
    size: wheel_size ? wheel_size : { $gt: 0 },
    keyword: wheel_size ? /wheel_size/ : { $gt: 0 },
  })
    .select("title size width profile condition type")
    .exec((err, body) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, payload: body });
    });
});

module.exports = router;
