const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: Number,
  phoneNumber: {
    type: String,
    required: true,
  },
  lastVisit: { type: Date, default: Date.now },
  email: String,
  image: String,
});
module.exports = mongoose.model("Customer", customerSchema);
