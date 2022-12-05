const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema({
  date: { type: Date, required: true },
  writer: { type: String, required: true },
  comment: { type: String },
});

const requestSchema = Schema(
  {
    writer: {
      // type: Schema.Types.ObjectId,
      // ref: "User",
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    state: {
      type: String,
      default: "fulfilled",
    },
    detail: {
      type: String,
      required: true,
    },
    comment: [commentSchema],
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = { Request };
