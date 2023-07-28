const Joi = require("joi");

// const createSchema = Joi.object({
//   firstName: Joi.string().required(),
//   lastName: Joi.string().required(),
//   age: Joi.number().optional(),
// });

// const create = async (req, res, next) => {
//   try {
//     await createSchema.validateAsync(req.body);
//     next();
//   } catch (err) {
//     res.json({ msg: "Appointment create failed ", error: err.message });
//   }
// };

// module.exports = {
//   create,
// };
