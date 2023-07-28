const Treatment = require("../models/treatment");

const create = async (req, res, next) => {
  const { name, duration } = req.body;

  const treatment = new Treatment({
    name,
    duration,
  });

  try {
    const response = await treatment.save();
    res.json({ msg: "Treatment Added Successfully", data: response });
  } catch (error) {
    res.status(500).json({ msg: "Treatment create failed", error });
  }
};

const findAll = async (req, res, next) => {
  try {
    const response = await Treatment.find();
    res.json({ msg: "Treatments fetch Successfully", data: response });
  } catch (error) {
    res.status(500).json({ msg: "Treatments fetch failed", error });
  }
};

module.exports = {
  create,
  findAll,
};
