const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// schema
const schemaData = mongoose.Schema(
  {
    name: String,
    description: String,
    dueDate: Date,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", schemaData);

// read data
// "http://localhost:8080/"
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});

// create data
// "http://localhost:8080/create"
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new userModel(req.body);
  await data.save();
  res.send({ success: true, message: "Data save successfully", data: data });
});

// update data
// "http://localhost:8080/update"
app.put("/update", async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;
  const data = await userModel.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: "Data updated successfully", data: data });
});

// delete data
// "http://localhost:8080/delete/:id"
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await userModel.deleteOne({ _id: id });
  res.send({ success: true, message: "Deleted successfully", data: data });
});

mongoose
  .connect("mongodb://localhost:27017/crudoperation")
  .then(() => {
    console.log("connect to Db");
    app.listen(PORT, () => console.log("Server is running"));
  })
  .catch((err) => console.log(err));
