const Customer = require("../models/customer");

const create = async (req, res, next) => {
  const { firstName, lastName, age, phoneNumber, email } = req.body;

  const customer = new Customer({
    firstName,
    lastName,
    age,
    phoneNumber,
    email,
  });

  try {
    const response = await customer.save();
    res.json({ msg: "Customer Added Successfully", data: response });
  } catch (error) {
    res.status(500).json({ msg: "Customer create failed", error });
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
      let response = await Customer.find({
        [criteriaMapping[criteria]]: { $regex: search, $options: "i" },
      });
      if (response.length === 0 && criteria === "name") {
        response = await Customer.find({
          lastName: { $regex: search, $options: "i" },
        });
      }
      res.json({ msg: "Customer found all", data: response });
    } catch (error) {
      res.status(500).json({ msg: "Customer create failed", error });
    }
  } else {
    try {
      const response = await Customer.find();
      res.json({ msg: "Customer found all", data: response });
    } catch (error) {
      res.status(500).json({ msg: "Customer create failed", error });
    }
  }
};
const findById = async (req, res, next) => {
  console.log("im on it: getting one customer");
  res.json({ message: "customers" });
};

const updateById = async (req, res, next) => {
  console.log("im on it: getting one customer");
  res.json({ message: "customers" });
};

const deleteById = async (req, res, next) => {
  console.log("im on it: getting one customer");
  res.json({ message: "customers" });
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
