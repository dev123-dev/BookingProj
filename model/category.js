const mongoose = require("mongoose");
const Schema = mongoose.Schema;
ObjectId = mongoose.Schema.ObjectId;

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  InstId: {
    type: ObjectId,
  },
  PropertyId: {
    type: ObjectId,
  },
  BelongsToId: {
    type: ObjectId,
    default: null,
  },
});

module.exports = category = mongoose.model("categories", categorySchema);
