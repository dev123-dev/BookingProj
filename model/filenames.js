const mongoose = require("mongoose");
const Schema = mongoose.Schema;
ObjectId = mongoose.Schema.ObjectId;

const fileSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
  },
  fileName: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
  },
  ImageUrl: {
    type: String,
  },
});

module.exports = filenames = mongoose.model("filenames", fileSchema);
