const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  lastLoggedInTimeStamp: {
    type: Date,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});
module.exports = mongoose.model("Admin", adminSchema);
