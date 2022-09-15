const express = require("express");
const mongoose = require("mongoose");
const app = express();

const route = require("./controller/control");
app.use(express.json());
app.use("/api", route);

app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/company", {})
  .then(() => {
    console.log("connect the databse");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(4000, () => {
  console.log("server is on...");
});
