const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middleware/auth");
const { handleFiles } = require("../modules/oci_sdk");
const fs = require("fs");
const fsExtra = require("fs-extra");
const { Tire } = require("../models/Tire");

const checkList = ["size", "width", "profile", "condition", "brand"];

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
    const IMAGE_FLAG = req.body.imageUpload === [] ? false : true;
    let getURL = [];
    let thumbNail;
    if (IMAGE_FLAG) {
      const handledFiles = await handleFiles(true);
      getURL = handledFiles[0];
      thumbNail = handledFiles[1];
      fsExtra.emptyDir(directoryPath);
    }
    const tire = new Tire({ ...req.body, image: getURL, thumbNail: thumbNail });
    tire.save((err) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    });
  }
);

router.get("/", (req, res) => {
  const tire_type = req.query.type;
  const tire_keyword = req.query.keyword;
  const tire_size = +req.query.size;
  const tire_width = +req.query.width;
  const tire_profile = +req.query.profile;
  const tire_condition = +req.query.condition;
  const page = req.query.page;
  let limit = page ? page * 10 : null;
  let skip = page ? (page - 1) * 10 : null;
  const EMPTY = { $gt: 0 };
  Tire.find({
    type: tire_type,
    keyword: tire_keyword ? { $regex: tire_keyword } : EMPTY,
    size: tire_size ? tire_size : EMPTY,
    width: tire_width ? tire_width : EMPTY,
    profile: tire_profile ? tire_profile : EMPTY,
    condition: tire_condition ? tire_condition : EMPTY,
  })
    .skip(skip ?? 0)
    .limit(limit ?? 12)
    .select("title size width profile condition type thumbNail")
    .exec((err, body) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, payload: body });
    });
});

router.get("/items", (req, res) => {
  Tire.aggregate([
    {
      $group: {
        _id: null,
        width: { $addToSet: "$width" },
        size: { $addToSet: "$size" },
        profile: { $addToSet: "$profile" },
        brand: { $addToSet: "$brand" },
        condition: { $addToSet: "$condition" },
      },
    },
  ]).exec((err, body) => {
    if (err) return res.status(400).json({ success: false, errorcode: err });
    else return res.status(200).json({ success: true, data: body });
  });
});
router.get("/:_id", (req, res) => {
  const _id = req.params._id;
  Tire.findById(_id).exec((err, body) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, payload: body });
  });
});

router.delete("/:_id", (req, res) => {
  const _id = req.params._id;
  Tire.findByIdAndRemove(_id).exec((err, body) => {
    if (err) return res.status(400).json({ success: false, errorcode: err });
    else return res.status(200).json({ success: true });
  });
});

module.exports = router;
