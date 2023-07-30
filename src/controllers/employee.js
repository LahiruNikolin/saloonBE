const Employee = require("../models/employee");

const create = async (req, res, next) => {
  const { firstName, lastName, birthDay, phoneNumber, email, salary } =
    req.body;

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
  const { search, criteria } = req.query;

  const criteriaMapping = {
    name: "firstName",
    phoneNo: "phoneNumber",
    email: "email",
  };
  if (search && criteria) {
    try {
      let response = await Employee.find({
        [criteriaMapping[criteria]]: { $regex: search, $options: "i" },
      });

      if (response.length === 0 && criteria === "name") {
        response = await Employee.find({
          lastName: { $regex: search, $options: "i" },
        });
      }

      res.json({ msg: "Employee fetch Successfully", data: response });
    } catch (error) {
      res.status(500).json({ msg: "Employee fetch failed", error });
    }
  } else {
    try {
      const response = await Employee.find();
      res.json({ msg: "Employee fetch Successfully", data: response });
    } catch (error) {
      res.status(500).json({ msg: "Employee fetch failed", error });
    }
  }
};

const deleteById = async (req, res, next) => {
  // console.log("req", req.params.id);
  // const response = await Employee.deleteById(req.params.id);
  res.json({ msg: "Employee delete Successfully", data: "response" });
};

module.exports = {
  create,
  findAll,
  deleteById,
};
