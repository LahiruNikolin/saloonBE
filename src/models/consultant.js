const mongoose = require("mongoose");

const guidanceSchema = new mongoose.Schema({
  consultCode: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Number,
    required: true,
  },
  afterDate: {
    type: Date,
    required: true,
  },
  beforeDate: {
    type: Date,
    required: true,
  },
  treatments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Treatment",
  },
  attended: {
    type: Boolean,
    default: false,
  },
  beforeImages: {
    type: [String],
  },
  afterImages: {
    type: [String],
  },
  scheduledAppointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    default: null,
  },
});

const ConsultSchema = new mongoose.Schema(
  {
    goal: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    consults: {
      type: [guidanceSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Consultant", ConsultSchema);
