import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import Card from 'react-bootstrap/Card';

// component that create a car in the database.
export default function AppointmentEdit(props) {
  const [user] = useContext(UserContext);
  const [doctor, setDoctor] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const [symptoms, setSymptoms] = useState("");
  const [description, setDescription] = useState("");
  const [edit, setEdited] = useState(false);

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "doctor") {
      setDoctor(value);
    } else if (name === "symptoms") {
      setSymptoms(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  // fetchs and sets all of the states to current values.
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/get/" + props.match.params.id)
      .then((res) => {
        console.log(res.data.doctor);
        setDoctor(res.data.doctor);
        setSymptoms(res.data.symptoms);
        setDescription(res.data.description);
      })
      .catch((err) => console.log(err));

    axios.get("http://localhost:8080/api/doctors").then((doctors) => {
      console.log(doctorList);
      setDoctorList(doctors.data);
    });
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    const appointment = {
      doctor,
      symptoms,
      description,
    };

    axios
      .post(
        "http://localhost:8080/api/update/" + props.match.params.id,
        appointment
      )
      .then(() => setEdited(true));
  }

  function handleDoctor(e) {
    setDoctor(e.target.value);
  }

  if (!user.accesstoken) {
    return <Redirect to="/login" />;
  } else if (edit === true) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <Card style={{ width: "450px" }} className="bg-light">
          <h3>Edit appointment</h3>
          <form style={{ margin:'0' }} className='m-2' onSubmit={onSubmit}>
            <div>
              <label>Doctor: </label>
              <select  className="form-control" onChange={handleDoctor}>
                {doctorList.map((doc) => {
                  console.log(doc);
                  const docMatch = doc.name + " " + doc.surname;
                  if (docMatch === doctor) {
                    return (
                      <option
                        selected
                        key={doc._id}
                        value={doc.name + " " + doc.surname}
                      >
                        {doc.name + " " + doc.surname}
                      </option>
                    );
                  } else {
                    return (
                      <option
                        key={doc._id}
                        value={doc.name + " " + doc.surname}
                      >
                        {doc.name + " " + doc.surname}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div >
              <label>Symptoms: </label>
              <textarea
                type="text"
                name="symptoms"
                className="form-control"
                value={symptoms}
                onChange={onChange}
              />
            </div>
            <div >
              <label>Description: </label>
              <textarea
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={onChange}
              />
            </div>
            <br />
            <div>
              <input
                style={{margin: '1% 1% 3% 60%'}}
                type="submit"
                value="Update appointment"
                className="btn btn-primary"
              />
            </div>
          </form>
        </Card>
      </div>
    );
  }
}
