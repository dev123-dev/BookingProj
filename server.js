require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Category = require("./model/category");
const assets = require("./model/assets");
const cors = require("cors");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connection to db established"));
app.use(express.json({ limit: "20mb", extended: true }));

app.use(
  express.urlencoded({ limit: "20mb", extended: true, parameterLimit: 50000 })
);
app.use(cors());

app.listen(process.env.PORT, () =>
  console.log(`server has started at port ${process.env.PORT}`)
);

app.post("/api", async (req, res) => {
  const { belongsToId } = req.body;
  try {
    const resSubCategory = await Category.find({
      belongsToId: !belongsToId //!data.label
        ? belongsToId
        : new mongoose.Types.ObjectId(belongsToId),
      instId: new mongoose.Types.ObjectId("64c8a1333a682392b042c38f"),
      propertyId: new mongoose.Types.ObjectId("64c8a4d13a682392b042c399"),
    });
    let query =
      resSubCategory.length !== 0
        ? [
          {
            $match: {
              belongsToId: !belongsToId //!data.label
                ? belongsToId
                : new mongoose.Types.ObjectId(belongsToId),
              instId: new mongoose.Types.ObjectId("64c8a1333a682392b042c38f"),
              propertyId: new mongoose.Types.ObjectId(
                "64c8a4d13a682392b042c399"
              ),
            },
          },
          {
            $lookup: {
              from: "assets",
              localField: "_id",
              foreignField: "category._id",
              as: "assets",
            },
          },
          {
            $project: {
              categoryName: 1,
              categoryWithCount: {
                $concat: [
                  "$categoryName",
                  " (",
                  { $toString: { $size: "$assets" } },
                  ")",
                ],
              },
              belongsToId: "$belongsToId",
              assetCount: {
                $size: "$assets",
              },
            },
          },
        ]
        : [
          {
            $match: {
              _id: !belongsToId //!data.label
                ? belongsToId
                : new mongoose.Types.ObjectId(belongsToId),
              instId: new mongoose.Types.ObjectId("64c8a1333a682392b042c38f"),
              propertyId: new mongoose.Types.ObjectId(
                "64c8a4d13a682392b042c399"
              ),
            },
          },
          {
            $lookup: {
              from: "assets",
              localField: "_id",
              foreignField: "category._id",
              as: "assets",
            },
          },
          {
            $unwind: {
              path: "$assets",
            },
          },
          {
            $project: {
              assetId: "$assets._id",
              assetName: "$assets.assetname",
              category: "$assets.category",
              features: "$assets.features",
            },
          },
        ];
    const details = await Category.aggregate(query);
    res.json(details);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
    console.log(error);
  }
});
