const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
    trim: true,
  },
  departmentCode: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    default: "Head Office",
  },
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
