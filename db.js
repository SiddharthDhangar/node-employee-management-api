const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGO_URL_LOCAL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

// event listener for connected
db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

//event listener for error
db.on("error", () => {
  console.log("MongoDB Connection error");
});
//event listener for disconnected
db.on("disconnected", () => {
  console.log("disconnected to MongoDB server");
});

module.exports = db;
