const mongoose = require("mongoose");
const Schema = mongoose.Schema;
ObjectId = mongoose.Schema.ObjectId;

const assetSchema = new mongoose.Schema({
  assetname: {
    type: String,
    required: true,
  },
  inst_id: {
    type: ObjectId,
  },
  property_id: {
    type: ObjectId,
  },
  features: [
    {
      _id: {
        type: ObjectId,
      },
      name: {
        type: String,
      },
    },
  ],
  cat_id: {
    type: ObjectId,
  },
});

module.exports = assets = mongoose.model("assets", assetSchema);
