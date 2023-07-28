const Employee = require("../models/employee");

const create = async (req, res, next) => {
  const { firstName, lastName, birthDay, phoneNumber, email, salary } = req.body;

  const employee = new Employee({
    firstName,
    lastName,
    birthDay,
    phoneNumber,
    email,
    salary,
  });

  try {
    const response = await employee.save();
    res.json({ msg: "Employee Added Successfully", data: response });
  } catch (error) {
    res.status(500).json({ msg: "Employee create failed", error });
  }
};

const findAll = async (req, res, next) => {
  try {
    const response = await Employee.find();
    res.json({ msg: "Employee fetch Successfully", data: response });
  } catch (error) {
    res.status(500).json({ msg: "Employee fetch failed", error });
  }
};

module.exports = {
  create,
  findAll
};
