import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { UserContext } from "../App";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Card from 'react-bootstrap/Card';

// insert a diagnosis for the appointment.
export default function Diagnosis(props) {
  const [user] = useContext(UserContext);
  const [diagnosis, setDiagnosis] = useState("");
  const [message, setMessage] = useState("");

  function onChange(e) {
    setDiagnosis(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    const insertDiagnosis = {
      diagnosis,
    };

    console.log(insertDiagnosis);
    // on submit will insert data for the diagnosis
    axios
      .post(
        "http://localhost:8080/api/diagnosis/" + props.match.params.id,
        insertDiagnosis,
        {
          headers: {
            Authorization: `Bearer ${user.accesstoken}`,
          },
        }
      )
      .then((res) => setMessage(res.data.message));
  }

  if (!user.accesstoken) {
    return <Redirect to="/login" />;
  }
  if (message === "Diagnosis added") {
    return (
      <>
        <Alert variant="success mobile-alert">{message}</Alert>
        <Card style={{ width: "460px" }} className="bg-light">
          <form onSubmit={onSubmit} style={{margin: '1%' }} >
            <label>Diagnosis: </label>
            <textarea
              type="text"
              name="Diagnosis"
              className="form-control"
              value={diagnosis}
              onChange={onChange}
            />
            <Button style={{margin: '1% 1% 1% 80%'}} type="submit">Submit</Button>
          </form>
        </Card>
      </>
    );
  } else {
    return (
      <>
        <Card style={{ width: "460px" }} className="bg-light">
          <form onSubmit={onSubmit} style={{margin: '1%' }} >
            <label>Diagnosis: </label>
            <textarea
              type="text"
              name="Diagnosis"
              className="form-control"
              value={diagnosis}
              onChange={onChange}
            />
            <Button style={{margin: '1% 1% 1% 80%'}} type="submit">Submit</Button>
          </form>
        </Card>
      </>
    );
  }
}
