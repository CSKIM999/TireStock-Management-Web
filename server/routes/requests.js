const express = require("express");
const multer = require("multer");
const { auth } = require("../middleware/auth");
const { uploadItemsInDirectory } = require("../modules/oci_sdk");
const router = express.Router();
const fs = require("fs");
const fsExtra = require("fs-extra");

// const path = require("path");

const { Request } = require("../models/Request");

const directoryPath = process.env.UPLOAD_DIR_PATH;
const namespaceName = process.env.NAME_SPACE_NAME;
const bucketName = process.env.BUCKET_NAME;
const cloudURL = "https://objectstorage.ap-seoul-1.oraclecloud.com";
const convertURL = (itemName) => {
  return `${cloudURL}/n/${namespaceName}/b/${bucketName}/o/${itemName}`;
};

try {
  fs.readdirSync(directoryPath);
} catch (error) {
  fs.mkdirSync(directoryPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, directoryPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});
// https://objectstorage.ap-seoul-1.oraclecloud.com/n/cnylck3cahga/b/bucket-20230124-0355/o/
const upload = multer({ storage: storage });

router.post("/", upload.array("image", 5), async (req, res) => {
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
      console.log(
        "🚀 ~ file: requests.js:49 ~ handleFiles ~ getFileURL",
        getFileURL
      );
      getFileURL.forEach((fileName) => {
        const URL = convertURL(fileName);
        imageURL = [...imageURL, URL];
      });
      console.log(
        "🚀 ~ file: requests.js:56 ~ getFileURL.forEach ~ imageURL",
        imageURL
      );
      return imageURL;
    }
    getURL = await handleFiles();
    console.log("🚀 ~ file: requests.js:65 ~ router.post ~ getURL", getURL);
    // fs.rmdir(directoryPath, { recursive: true }, (err) => {})
    fsExtra.emptyDir(directoryPath);

    return res
      .status(200)
      .json({ success: true, images: getURL, body: req.body });
  }
  const convertedBody = {};
  const request = new Request(req.body);

  // request.save((err) => {
  //   if (err) return res.status(400).json({ success: false, err });
  //   return res.status(200).json({ success: true });
  // });
});

router.post("/imageUploadTest", (req, res) => {
  return res.status(200).json({ err: getFileURL });
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

router.put("/:_id", upload.array("image", 5), (req, res) => {
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
  const withOutNotice = { $nin: "notice" };

  Request.find(
    state
      ? { state: "notice" }
      : userID
      ? { writer: userID, state: withOutNotice }
      : { state: withOutNotice }
  )
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
