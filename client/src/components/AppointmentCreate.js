import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Alert from "react-bootstrap/Alert";

// component that create a appointment in the database.
export default function AppointmentCreate() {
  const [user] = useContext(UserContext);
  const [doctorList, setDoctorList] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "symptoms") {
      setSymptoms(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  // at mount will sett all the doctor names in list.
  useEffect(() => {
    axios.get("http://localhost:8080/api/doctors").then((doctors) => {
      setDoctorList(doctors.data);
      setDoctor(doctors.data[0].name + " " + doctors.data[0].surname);
    });
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    const appointment = {
      doctor,
      symptoms,
      description,
    };

    console.log(appointment);

    axios
      .post("http://localhost:8080/api/add", appointment, {
        headers: {
          Authorization: `Bearer ${user.accesstoken}`,
        },
      })
      .then((res) => setMessage(res.data.message));

    setSymptoms("");
    setDescription("");
  }

  function handleDoctor(e) {
    console.log(doctor);
    console.log(e.target.value);
    setDoctor(e.target.value);
  }

  console.log(doctor);
  if (!user.accesstoken) {
    return <Redirect to="/login" />;
  } if (message === 'Appointment added') {
    return (
      <div>
        <Alert variant="success mobile-alert">{message}</Alert>
        <Card className="bg-light widthAppointmentCard">
          <h3>Create appointment</h3>
          <form onSubmit={onSubmit} className='m-2'>
            <div className="form-group">
              <label>Dr:</label>
              <select className="form-control" onChange={handleDoctor}>
                {doctorList.map((doctor) => {
                  return (
                    <option
                      key={doctor._id}
                      value={doctor.name + " " + doctor.surname}
                    >
                      {doctor.name + " " + doctor.surname}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Symptoms: </label>
              <textarea
                type="text"
                name="symptoms"
                className="form-control"
                value={symptoms}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description: </label>
              <textarea
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={onChange}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="submit"
                value="Add appointment"
                className="btn btn-primary marginAppointmentButton"
              />
            </div>
          </form>
        </Card>
      </div>
    );
  }else {
    return (
      <div>
        <h4>{message}</h4>
        <Card className="bg-light widthAppointmentCard">
          <h3>Create appointment</h3>
          <form onSubmit={onSubmit} className='m-2'>
            <div className="form-group">
              <label>Dr:</label>
              <select className="form-control" onChange={handleDoctor}>
                {doctorList.map((doctor) => {
                  return (
                    <option
                      key={doctor._id}
                      value={doctor.name + " " + doctor.surname}
                    >
                      {doctor.name + " " + doctor.surname}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Symptoms: </label>
              <textarea
                type="text"
                name="symptoms"
                className="form-control"
                value={symptoms}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description: </label>
              <textarea
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={onChange}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="submit"
                value="Add appointment"
                className="btn btn-primary marginAppointmentButton"
              />
            </div>
          </form>
        </Card>
      </div>
    );
  }
}
