import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { UserContext } from "../App";
import { Redirect } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import Table from "react-bootstrap/Table";

// compoennt to handle the list of cars on the font-end
export default function AppointmentList() {
  const [user] = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [docRegister, setDocRegister] = useState(false);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [appointmentId, setAppointmentId] = useState(false);
  const [diagnosis, setDiagnosis] = useState(false);
  const [dateScheduled, setDateScheduled] = useState(false);
  const [diagnosisId, setDiagnosisId] = useState("");
  const [DateScheduledId, setDateScheduledId] = useState("");

  // fetch the data when component mounts and chooses the correct role to do a fetch call.
  useEffect(() => {
    if (user.role === "patient") {
      axios
        .post(
          "http://localhost:8080/api/patient/appointments",
          {},
          {
            headers: {
              Authorization: `Bearer ${user.accesstoken}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data[0].dateCreated.substring(0, 10));
          setAppointments(res.data);
          console.log(appointments);
        })
        .catch((err) => console.log(err));
      console.log("logged in as patient");
    } else if (user.role === "doctor") {
      console.log(user);
      axios
        .post(
          "http://localhost:8080/api/doctor/appointments",
          {},
          {
            headers: {
              Authorization: `Bearer ${user.accesstoken}`,
            },
          }
        )
        .then((res) => {
          // console.log(res.data[0].date.substring(0, 4) - 5);
          setAppointments(res.data);
        })
        .catch((err) => console.log(err));
    } else if (user.role === "admin") {
      axios
        .post(
          "http://localhost:8080/api/admin/appointments",
          {},
          {
            headers: {
              Authorization: `Bearer ${user.accesstoken}`,
            },
          }
        )
        .then((res) => {
          // console.log(res.data[0].date.substring(0, 4) - 5);
          setAppointments(res.data);
        })
        .catch((err) => console.log(err));
      console.log("logged in as admin");
    }
  }, []);

  // handles the deleted cars
  function deleteAppointment(id) {
    console.log(id);
    axios
      .delete("http://localhost:8080/api/delete/" + id)
      .then((res) => console.log(res.data));

    setAppointments(
      appointments.filter((appointment) => appointment._id !== id)
    );
  }

  function handleRole() {
    if (user.role === "admin") {
      setAdd(false);
      setDocRegister(true);
    } else if (user.role === "patient") {
      setDocRegister(false);
      setAdd(true);
    }
  }

  function handleEdit(id) {
    if (edit === false) {
      setAppointmentId(id);
      setEdit(true);
    }
  }

  // insert diagnosis
  function handleDiagnosis(id) {
    setDiagnosisId(id);
    setDiagnosis(true);
  }

  // insert date scheduled
  function handleDateScheduled(id) {
    setDateScheduledId(id);
    setDateScheduled(true);
  }

  // denpending on the role it will determine on the view to render.
  if (!user.accesstoken) {
    return <Redirect to="/login" />;
  } else if (add === true) {
    return <Redirect to="/add" />;
  } else if (edit === true) {
    return <Redirect to={"/edit/" + appointmentId} />;
  } else if (docRegister === true) {
    return <Redirect to="/doctor/register" />;
  } else if (diagnosis === true) {
    return <Redirect to={"/diagnosis/" + diagnosisId} />;
  } else if (dateScheduled === true) {
    return <Redirect to={"/dateScheduled/" + DateScheduledId} />;
  } else if (user.role === "admin") {
    return (
      <div>
        <h3 className='text-center marginAllaround' >Appointments</h3>
        <Button className="top-button " onClick={() => {handleRole()}}>Create Doctor</Button>
        <Table striped bordered hover size="sm">
          <thead className="thead-light">
            <tr>
              <th>Doctor</th>
              <th>Symptoms</th>
              <th>Description</th>
              <th>Diagnosis</th>
              <th>Date created</th>
              <th>Date Scheduled</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((currentAppointments) => {
              console.log(currentAppointments._id);
              return (
                <tr>
                  <td>{currentAppointments.doctor}</td>
                  <td>{currentAppointments.symptoms}</td>
                  <td>{currentAppointments.description}</td>
                  <td>{currentAppointments.diagnosis}</td>
                  <td>
                    {currentAppointments.dateCreated.substring(0, 10) +
                      " " +
                      currentAppointments.dateCreated.substring(11, 16)}
                  </td>
                  <td>
                    {currentAppointments.dateScheduled
                      ? currentAppointments.dateScheduled
                      : "waiting for doctors response"}
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleEdit(currentAppointments._id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => {
                        handleDateScheduled(currentAppointments._id);
                      }}
                    >
                      Date Schedule
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteAppointment(currentAppointments._id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  } else if (user.role === "doctor") {
    return (
      <div>
        <h3 className="text-center marginAllaround" >Appointments</h3>
        <Table striped bordered hover size="sm">
          <thead className="thead-light">
            <tr>
              <th>Doctor</th>
              <th>Symptoms</th>
              <th>Description</th>
              <th>Diagnosis</th>
              <th>Date created</th>
              <th>Date Scheduled</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((currentAppointments) => {
              console.log(currentAppointments);
              return (
                <tr>
                  <td>{currentAppointments.doctor}</td>
                  <td>{currentAppointments.symptoms}</td>
                  <td>{currentAppointments.description}</td>
                  <td>{currentAppointments.diagnosis}</td>
                  <td>
                    {currentAppointments.dateCreated.substring(0, 10) +
                      " " +
                      currentAppointments.dateCreated.substring(11, 16)}
                  </td>
                  <td>
                    {currentAppointments.dateScheduled
                      ? currentAppointments.dateScheduled
                      : "waiting for your response"}
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        console.log(currentAppointments._id);
                        handleDiagnosis(currentAppointments._id);
                      }}
                    >
                      Diagnosis
                    </Button>{" "}
                    |{" "}
                    <Button
                      variant="success"
                      onClick={() => {
                        handleDateScheduled(currentAppointments._id);
                      }}
                    >
                      Date Schedule
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  } else {
    return (
      <div>
        <h3 className='text-center marginAllaround' >Appointments</h3>
        <Button className='top-button' onClick={() => {handleRole()}}>Create Appointment</Button>
        <Table striped bordered hover size="sm">
          <thead className="thead-light">
            <tr>
              <th>Doctor</th>
              <th>Symptoms</th>
              <th>Description</th>
              <th>Diagnosis</th>
              <th>Date created</th>
              <th>Date Scheduled</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((currentAppointments) => {
              console.log(currentAppointments);
              return (
                <tr>
                  <td>{currentAppointments.doctor}</td>
                  <td>{currentAppointments.symptoms}</td>
                  <td>{currentAppointments.description}</td>
                  <td>{currentAppointments.diagnosis}</td>
                  <td>
                    {currentAppointments.dateCreated.substring(0, 10) +
                      " " +
                      currentAppointments.dateCreated.substring(11, 16)}
                  </td>
                  <td>
                    {currentAppointments.dateScheduled
                      ? currentAppointments.dateScheduled
                      : "waiting for doctors response"}
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleEdit(currentAppointments._id);
                      }}
                    >
                      Edit
                    </Button>{" "}
                    |{" "}
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteAppointment(currentAppointments._id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
