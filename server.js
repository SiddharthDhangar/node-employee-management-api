// import dotenv file
require("dotenv").config();

//import express
const express = require("express");
const app = express();
// body parser
app.use(express.json());
// import db
const db = require("./db.js");
const port = process.env.PORT || 3000;

// importing employee routes
const employeeRouter = require("./routes/employee.routes.js");
const departmentRouter = require("./routes/department.routes.js");

app.get("/", (req, res) => {
  res.send("Hey Everyone How it's your day going..");
});

//using routes here instead of writing all code here
app.use("/employee", employeeRouter);
app.use("/department", departmentRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
