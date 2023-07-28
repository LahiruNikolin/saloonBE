const Joi = require("joi");

const createSchema = Joi.object({
  name: Joi.string().required(),
  duration: Joi.string().required(),
});

const create = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res
      .status(400)
      .json({ msg: "Treatment create failed ", error: err.message });
  }
};

module.exports = {
  create,
};
