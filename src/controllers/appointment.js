const Appointment = require("../models/appointment");
const Employee = require("../models/employee");
const mappers = require("../utils/mappers");
const { generateColor } = require("../utils/helpers");
const shortid = require("shortid");
const mongoose = require("mongoose");

const create = async (req, res, next) => {
  const {
    title,
    startTime,
    endTime,
    customer,
    employee,
    treatments,
    scheduledDate,
  } = req.body;

  const jobId = shortid.generate();

  const appointment = new Appointment({
    title,
    jobId,
    startTime,
    endTime,
    treatments,
    scheduledDate,
    customer,
    employee,
    color: generateColor(),
  });

  try {
    const response = await appointment.save();
    res.json({ msg: "Appointment Added Successfully", data: response });
  } catch (error) {
    res.status(500).json({ msg: "Appointment create failed", error });
  }
};

const findAll = async (req, res, next) => {
  try {
    const response = await Appointment.find();
    res.json({ msg: "Appointments fetch Successfully", data: response });
  } catch (error) {
    res.status(500).json({ msg: "Appointments fetch failed", error });
  }
};

const findByDate = async (req, res, next) => {
  try {
    const date = req.params.date;

    const response = await Appointment.find({ scheduledDate: date })
      .populate("customer")
      .populate("employee")
      .populate("treatments")
      .lean();

    const allEmployees = await Employee.find();
    const mappedRes = mappers.mapApointmentsByDate(response);
    res.json({
      msg: "Appointments fetch Successfully",
      data: mappers.mapAppendAnyRemainingEmployees(mappedRes, allEmployees),
    });
  } catch (error) {
    res.status(500).json({ msg: "Appointments fetch failed", error });
  }
};

const findById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const response = await Appointment.find({ _id: id })
      .populate("customer")
      .populate("employee")
      .populate("treatments")
      .lean();

    res.json({
      msg: "Appointments fetch Successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ msg: "Appointments fetch failed", error });
  }
};

const update = async (req, res, next) => {
  const payload = req.body;
  try {
    if (payload.type === "jobStatus") {
      const jobStatus = {
        isStarted: !!payload?.isStarted,
        isCompleted: payload.isStarted ? false : payload.isCompleted,
      };

      await Appointment.updateOne(
        {
          _id: payload.appointmentId,
        },
        {
          jobStatus,
        }
      );

      res.json({ msg: "Appointments update success", data: null });
    }
  } catch (error) {
    res.status(500).json({ msg: "Appointments fetch failed", error });
  }
};

const findByCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.customerID;

    const response = await Appointment.find({
      customer: customerId,
    })
      .populate("employee")
      .populate("treatments")
      .lean()
      .sort({ scheduledDate: "desc" });

    res.json({
      msg: "Appointments fetch Successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ msg: "Appointments fetch failed", error });
  }
};

module.exports = {
  create,
  findAll,
  findById,
  findByDate,
  findByCustomer,
  update,
};
