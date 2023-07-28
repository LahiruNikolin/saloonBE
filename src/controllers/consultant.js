const Consultant = require("../models/consultant");
const mappers = require("../utils/mappers");

const create = async (req, res, next) => {
  const { goal, customer, consults } = req.body;

  const updatedGuidance = consults.map((item) => {
    const { id, timeStamp, afterDate, beforeDate, treatments } = item;
    return {
      consultCode: id,
      timeStamp,
      afterDate,
      beforeDate,
      treatments,
    };
  });

  const consultant = new Consultant({
    goal,
    customer,
    consults: updatedGuidance,
  });

  try {
    const response = await consultant.save();
    res.json({ msg: "Consultation created Successfully", data: response });
  } catch (error) {
    res.status(500).json({ msg: "Appointment create failed", error });
  }
};

const findAll = async (req, res, next) => {
  try {
    const response = await Consultant.find()
      .populate("customer")
      .populate("consults.treatments")
      .populate("consults.scheduledAppointment")
      .lean()
      .sort({ createdAt: "desc" });
    res.json({ msg: "All Consultation fetch Successfully", data: response });
  } catch (error) {
    res.status(500).json({ msg: "Consultation fetch failed", error });
  }
};

const findById = async (req, res, next) => {
  try {
    const date = req.params.date;

    const response = await Consultant.find({ scheduledDate: date })
      .populate("customer")
      .populate("employee")
      .populate("treatments")
      .populate("scheduledAppointment")
      .lean();
    const mappedRes = mappers.mapApointmentsByDate(response);
    res.json({
      msg: "Consultation fetch Successfully",
      data: mappedRes,
    });
  } catch (error) {
    res.status(500).json({ msg: "Consultation fetch failed", error });
  }
};

const update = async (req, res, next) => {
  const payload = req.body;
  try {
    if (payload.type === "scheduleAppointment") {
      const consultant = await Consultant.findById(payload.consultantId).lean();

      const courses = consultant.consults.map((course) => {
        if (course._id?.valueOf() === payload.courseId) {
          return {
            ...course,
            scheduledAppointment: payload.appointmentId,
            treatments: payload.treatments,
          };
        }
        return course;
      });

      const response = await Consultant.updateOne(
        {
          _id: payload.consultantId,
        },
        {
          consults: courses,
        }
      );

      res.json({ msg: "Consultation update success", data: null });
    }
  } catch (error) {
    res.status(500).json({ msg: "Consultation fetch failed", error });
  }
};

module.exports = {
  create,
  update,
  findAll,
  findById,
};
