const mongoose = require("mongoose");
const treatmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  duration: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Treatment", treatmentSchema);
