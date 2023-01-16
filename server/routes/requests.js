const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();

const { Request } = require("../models/Request");

router.post("/", (req, res) => {
  const request = new Request(req.body);
  request.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/:_id/comment", (req, res) => {
  const _id = req.params._id;
  const newComment = {
    date: new Date(),
    writer: req.body.writer,
    w_id: req.body.w_id,
    comment: req.body.comment,
  };
  Request.findByIdAndUpdate(_id, { $push: { comment: newComment } }).exec(
    (err, body) => {
      if (err) return res.status(400).json({ success: false, errorcode: err });
      return res
        .status(200)
        .json({ success: true, payload: body.comment, test: req.body });
    }
  );
});

router.put("/:_id", (req, res) => {
  const _id = req.params._id;
  const { title, detail, image } = req.body;
  Request.findByIdAndUpdate(_id, {
    title: title,
    detail: detail,
    image: image,
  }).exec((err, body) => {
    if (err) return res.status(400).json({ success: false, errorcode: err });
    return res.status(200).json({ success: true, checkBody: body });
  });
});

router.get("/", (req, res) => {
  // limit & skip 에 맞는 정보들과 find 해서 가져올거니
  const page = req.query.page;
  const userID = req.query.userID;
  const state = req.query.state;
  let limit = page ? page * 10 : 10;
  let skip = page ? (page - 1) * 10 : 0;
  let total = 0;

  Request.find(state ? { state: state } : userID ? { writer: userID } : {})
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      if (!page) {
        Request.find().count((err, count) => {
          if (!err && count)
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
  Request.findById(_id)
    .populate("writer")
    .exec((err, body) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, payload: body });
    });
});

router.delete("/:_id", (req, res) => {
  const _id = req.params._id;
  Request.findByIdAndRemove(_id).exec((err, body) => {
    if (err) return res.status(400).json({ success: false, errorcode: err });
    else return res.status(200).json({ success: true });
  });
});

router.delete("/:_id/:commentId", (req, res) => {
  const _id = req.params._id;
  const commentId = req.params.commentId;

  Request.findByIdAndUpdate(_id, {
    $pull: { comment: { _id: commentId } },
  }).exec((err, body) => {
    if (err) return res.status(400).json({ success: false, errorcode: err });
    else
      return res
        .status(200)
        .json({ success: true, payload: body.comment, test: req.body });
  });
});
module.exports = router;
