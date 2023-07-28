const Joi = require("joi");

const createSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthDay: Joi.string().optional(),
  phoneNumber: Joi.number().required(),
  salary: Joi.number().required(),
  email: Joi.string().email().optional(),
});

const create = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).json({ msg: "Employee create failed ", error: err.message });
  }
};

module.exports = {
  create,
};
