const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  jobId: {
    type: String,
    index: true,
  },
  color: { type: String, required: true },
  scheduledDate: { type: Date, required: true },
  startTime: { type: Date },
  jobStatus: {
    isCompleted: { type: Boolean, default: false },
    isStarted: { type: Boolean, default: false },
  },
  endTime: { type: Date },
  treatments: {
    type: [mongoose.ObjectId],
    ref: "Treatment",
    required: true,
  },
  customer: { type: mongoose.ObjectId, ref: "Customer", required: true },
  employee: { type: mongoose.ObjectId, ref: "Employee", required: true },
});
module.exports = mongoose.model("Appointment", appointmentSchema);
