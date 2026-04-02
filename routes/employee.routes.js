const express = require("express");
const router = express.Router();
// importing employee models
const Employee = require("../models/employee.model.js");
const Department = require("../models/department.model.js");

const getDepartmentId = async (departmentCode) => {
  if (!departmentCode) return null;
  return await Department.findOne({
    departmentCode: new RegExp(`^${departmentCode.trim()}$`, "i"),
  });
};

// CREATE OPERATION POST METHOD
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (!data.departmentCode) {
      return res.status(400).json({
        message: "Department code is required",
      });
    }

    const dept = await getDepartmentId(data.departmentCode?.trim());

    if (!dept) {
      return res.status(400).json({
        message: "Department not found",
      });
    }

    data.department = dept._id;
    delete data.departmentCode;

    const newEmployee = new Employee(data);
    const saved = await newEmployee.save();
    // 🔥 populate after save
    const response = await saved.populate("department");
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Converting mongodb time that is in UTC
const convertToIST = (date) => {
  return new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
};

// READ OPERATION GET METHOD
router.get("/", async (req, res) => {
  try {
    const { firstName, lastName, departmentCode } = req.query;
    const filter = {};
    if (firstName) {
      filter.firstName = { $regex: firstName.trim(), $options: "i" };
    }
    if (lastName) {
      filter.lastName = { $regex: lastName.trim(), $options: "i" };
    }
    // NEW LOGIC FOR DEPARTMENT
    if (departmentCode) {
      const deptCode = departmentCode
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean);
      const departments = await Department.find({
        departmentCode: {
          $in: deptCode.map((code) => new RegExp(`^${code}$`, "i")),
        },
      });
      const deptIds = departments.map((d) => d._id);
      if (deptIds.length === 0) {
        return res.status(404).json({
          message: "No departments found",
        });
      }
      filter.department = { $in: deptIds };
    }
    const data = await Employee.find(filter).populate("department");
    const converted = data.map((emp) => ({
      ...emp.toObject(),
      createdAt: convertToIST(emp.createdAt),
      updatedAt: convertToIST(emp.updatedAt),
      joiningDate: emp.joiningDate ? convertToIST(emp.joiningDate) : null,
    }));

    res.status(200).json(converted);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// UPDATE OPERATION PUT METHOD
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    if (updatedData.departmentCode) {
      const dept = await getDepartmentId(updatedData.departmentCode.trim());

      if (!dept) {
        return res.status(400).json({
          message: "Department not found",
        });
      }
      updatedData.department = dept._id;
      delete updatedData.departmentCode; // 🔥 important cleanup
    }

    const response = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    }).populate("department");

    if (!response) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// DELETE OPERATION DELETE METHOD
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Employee.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({
      message: "Employee deleted successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;
