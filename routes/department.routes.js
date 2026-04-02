const express = require("express");
const router = express.Router();
// importing employee model
const Department = require("../models/department.model.js");

// CREATE OPERATIONS POST METHOD
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    if (!data.departmentName) {
      return res.status(400).json({
        message: "Department name is required",
      });
    }
    if (!data.departmentCode) {
      return res.status(400).json({
        message: "Department code is required",
      });
    }

    // Checking wether user enter the same department code
    const existing = await Department.findOne({
      departmentCode: data.departmentCode,
    });

    if (existing) {
      return res.status(400).json({
        message: "Department code already exists",
      });
    }

    const newDepartment = new Department(data);
    const response = await newDepartment.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// READ OPERATIONS GET METHOD
router.get("/", async (req, res) => {
  try {
    const { departmentName, location } = req.query;

    const filter = {};

    if (departmentName) {
      filter.departmentName = { $regex: departmentName.trim(), $options: "i" };
    }
    if (location) {
      filter.location = { $regex: location.trim(), $options: "i" };
    }
    
    const response = await Department.find(filter);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// UPDATE OPERATIONS PUT METHOD
router.put("/:departMentCode", async (req, res) => {
  try {
    const { departMentCode } = req.params;
    const updateDepartment = req.body;
    const response = await Department.findOneAndUpdate(
      { departmentCode: departMentCode },
      updateDepartment,
      {
        new: true,
      },
    );
    if (!response) {
      return res.status(404).json({ message: "department not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// DELETE OPERATIONS DELETE METHOD
router.delete("/:departMentCode", async (req, res) => {
  try {
    const { departMentCode } = req.params;
    const response = await Department.findOneAndDelete({
      departmentCode: departMentCode,
    });
    if (!response) {
      return res.status(404).json({ message: "department not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;
