const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDay: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
});
module.exports = mongoose.model("Employee", employeeSchema);
