const express = require("express");
const router = express.Router();

const { Request } = require("../models/Request");

router.post("/", (req, res) => {
  const request = new Request(req.body);
  request.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.get("/", (req, res) => {
  // limit & skip 에 맞는 정보들과 find 해서 가져올거니
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let skip = req.query.skip ? parseInt(req.query.skip) : 0;
  let total = 0;
  const getCount = () => {
    Request.find().count((err, count) => {
      if (!err && count) total = count;
    });
  };
  Request.find()
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      let body = { success: true, payload: data };

      if (!req.query.limit && !req.query.skip) {
        // body.totalDocuments = Request.find().count((err, count) => {
        //   if (!err && count) return count;
        // });
        Request.find().count((err, count) => {
          if (!err && count)
            console.log({
              success: true,
              payload: data,
              totalDocuments: count,
            });
          return res
            .status(200)
            .json({ success: true, payload: data, totalDocuments: count });
        });
      } else {
        return res.status(200).json({ success: true, payload: data });
      }
    });
});

router.get("/:_id", (req, res) => {
  const _id = req.params._id;
  Request.findById(_id).exec((err, body) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, payload: body });
  });
});

module.exports = router;
