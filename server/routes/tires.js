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
    .select("title size width profile condition type thumbNail")
    .exec((err, body) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, payload: body });
    });
});

router.get("/:_id", (req, res) => {
  const _id = req.params._id;
  Tire.findById(_id).exec((err, body) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, payload: body });
  });
});

router.post(
  "/test",
  upload.fields([
    { name: "image", maxCount: 5 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  (req, res) => {
    console.log("🚀 ~ file: tires.js:100 ~ router.post ~ req.files", req.files);
    const IMAGE_FLAG = req.body.imageUpload === [] ? false : true;
    let getURL = [];
    if (IMAGE_FLAG) {
      async function handleFiles() {
        let imageURL = [];
        const uploadResponse = await uploadItemsInDirectory(
          directoryPath,
          namespaceName,
          bucketName
        );
        if (!uploadResponse) return res.status(404).json({ success: false });
        const getFileURL = fs.readdirSync(directoryPath);
        getFileURL.forEach((fileName) => {
          const type = fileName.split("-")[0];
          if (type === "image") {
            const URL = convertURL(fileName);
            imageURL = [...imageURL, URL];
          } else if (type === "thumbnail") {
          }
        });
        return imageURL;
      }
      getURL = handleFiles();
      fsExtra.emptyDir(directoryPath);
    }
    const Body = {
      writer: req.body.writer,
      title: req.body.title,
      detail: req.body.detail,
      image: getURL,
    };
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
  }
);

module.exports = router;
