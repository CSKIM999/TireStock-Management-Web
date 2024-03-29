const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wheelSchema = Schema({
  // writer: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: "User",
  // },
  // date: {
  //   type: Date,
  //   required: true,
  // },

  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
  },
  thumbNail: {
    type: String,
  },
  size: {
    type: Number,
    required: true,
  },
  design: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
  },
});

const Wheel = mongoose.model("Wheel", wheelSchema);

module.exports = { Wheel };
