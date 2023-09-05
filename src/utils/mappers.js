const { format } = require("date-fns");

const mapApointmentsByDate = (results) => {
  const transformedArray = [];
  for (const appointment of results) {
    if (
      transformedArray.find(
        (employee) => employee?.empId === appointment.employee._id
      )
    ) {
      const employee = transformedArray.find(
        (employee) => employee?.empId === appointment.employee._id
      );

      const existingSessions = [...employee.sessions];

      existingSessions.push({
        appointmentId: appointment._id,
        jobId: appointment.jobId,
        startTime: format(appointment.startTime, "h:mm aaa"),
        endTime: format(appointment.endTime, "h:mm aaa"),
        treatments: appointment.treatments.map((treatment) => ({
          name: treatment.name,
          price: parseFloat(treatment.price),
        })),
        isStarted: appointment.jobStatus?.isStarted,
        isCompleted: appointment.jobStatus?.isCompleted,
        color: appointment.color,
      });
      employee.sessions = existingSessions;
    } else {
      const item = {
        id: appointment._id,
        jobId: appointment.jobId,
        empId: appointment.employee._id,
        customer: appointment.customer,
        title: appointment.title,
        name: `${appointment.employee.firstName} ${appointment.employee.lastName}`,
        sessions: [
          {
            appointmentId: appointment._id,
            jobId: appointment.jobId,
            startTime: format(appointment.startTime, "h:mm aaa"),
            endTime: format(appointment.endTime, "h:mm aaa"),
            treatments: appointment.treatments.map((treatment) => ({
              name: treatment.name,
              price: parseFloat(treatment.price),
            })),
            isStarted: appointment.jobStatus?.isStarted,
            isCompleted: appointment.jobStatus?.isCompleted,
            color: appointment.color,
          },
        ],
      };

      transformedArray.push(item);
    }
  }

  return transformedArray;
};

const mapAppendAnyRemainingEmployees = (appointments, allEmployeesList) => {
  const allEmployees = allEmployeesList.map((item) => ({
    _id: item._id,
    name: `${item.firstName} ${item.lastName}`,
  }));
  const combinedEmployees = allEmployees.map((item) => {
    const assingedWork = appointments.find(
      (appointment) =>
        String(appointment.empId).toString() === String(item._id).toString()
    );

    if (assingedWork) return assingedWork;
    return {
      empId: item._id,
      name: item.name,
      sessions: [],
    };
  });

  return combinedEmployees;
};

module.exports = {
  mapApointmentsByDate,
  mapAppendAnyRemainingEmployees,
};
