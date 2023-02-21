const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middleware/auth");
const { handleFiles } = require("../modules/oci_sdk");
const fs = require("fs");
const fsExtra = require("fs-extra");
const { Wheel } = require("../models/Wheel");
const directoryPath = process.env.UPLOAD_DIR_PATH;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, directoryPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Math.floor(Math.random() * 1e9) +
        Date.now() +
        ".jpg"
    );
  },
});
const upload = multer({ storage: storage });

try {
  fs.readdirSync(directoryPath);
} catch (error) {
  fs.mkdirSync(directoryPath);
}

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 5 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  async (req, res) => {
    if (req.body.imageUpload) {
      const handledFiles = await handleFiles(true);
      getURL = handledFiles[0];
      thumbNail = handledFiles[1];
      fsExtra.emptyDir(directoryPath);
    }
    const wheel = new Wheel({
      ...req.body,
      image: getURL,
      thumbNail: thumbNail,
    });
    wheel.save((err) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    });
  }
);

router.get("/", (req, res) => {
  const wheel_type = req.query.type;
  const wheel_region = req.query.region;
  const wheel_design = req.query.design;
  const wheel_size = +req.query.size;
  const page = req.query.page;
  let limit = page ? page * 10 : 10;
  let skip = page ? (page - 1) * 10 : 0;
  const EMPTY = { $gt: 0 };
  Wheel.find({
    type: wheel_type,
    region: wheel_region ? wheel_region : EMPTY,
    design: wheel_design ? wheel_design : EMPTY,
    size: wheel_size ? wheel_size : EMPTY,
  })
    .skip(skip ?? 0)
    .limit(limit ?? 12)
    .select("title size type design region thumbNail")
    .exec((err, body) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, payload: body });
    });
});
router.get("/items", (req, res) => {
  Wheel.aggregate([
    {
      $group: {
        _id: null,
        size: { $addToSet: "$size" },
      },
    },
  ]).exec((err, body) => {
    if (err) return res.status(400).json({ success: false, errorcode: err });
    else return res.status(200).json({ success: true, data: body });
  });
});
router.get("/:_id", (req, res) => {
  const _id = req.params._id;
  Wheel.findById(_id).exec((err, body) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, payload: body });
  });
});

router.delete("/:_id", (req, res) => {
  const _id = req.params._id;
  Wheel.findByIdAndRemove(_id).exec((err, body) => {
    if (err) return res.status(400).json({ success: false, errorcode: err });
    else return res.status(200).json({ success: true });
  });
});

module.exports = router;
