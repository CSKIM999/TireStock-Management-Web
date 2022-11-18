const express = require("express");
const router = express.Router();

const { Tire } = require("../models/Tire");

const checkList = ["size", "width", "profile", "condition", "brand"];

router.post("/", (req, res) => {
  const tire = new Tire(req.body);
  tire.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});
router.get("/", (req, res) => {
  const tire_type = req.query.type;
  const tire_keyword = req.query.keyword;
  const tire_size = +req.query.size;
  const tire_width = +req.query.width;
  const tire_profile = +req.query.profile;
  const tire_condition = +req.query.condition;
  // writer 정보는 주고싶지 않음.
  const EMPTY = { $gt: 0 };

  Tire.find({
    type: tire_type,
    keyword: tire_keyword ? { $regex: tire_keyword } : EMPTY,
    size: tire_size ? tire_size : EMPTY,
    width: tire_width ? tire_width : EMPTY,
    profile: tire_profile ? tire_profile : EMPTY,
    condition: tire_condition ? tire_condition : EMPTY,
  })
    .select("title size width profile condition type")
    .exec((err, body) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, payload: body });
    });
});

router.post("/test", (req, res) => {
  // 생성할땐 상관없이 그냥 집어넣기
  // 삭제할 땐 하나씩 순회해서 자신이 마지막 원소인지 판별
  // const tire = new Tire(req.body);
  // const test = Object.entries(tire._doc);
  // test.forEach((item) => {
  //   const key = item[0];
  //   const value = item[1];
  //   if (checkList.some((check) => check === key)) {
  //     console.log(value);
  //   }
  // });
  // return res.status(200).json({ data: tire });
});

module.exports = router;
