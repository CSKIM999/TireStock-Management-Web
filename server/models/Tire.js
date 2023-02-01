const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tireSchema = Schema({
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
  image: {
    type: Array,
  },
  thumbNail: {
    type: String,
  },
  detail: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  profile: {
    type: Number,
    required: true,
  },
  condition: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
});

const Tire = mongoose.model("Tire", tireSchema);

module.exports = { Tire };
