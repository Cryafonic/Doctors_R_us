import '../App.css'
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { UserContext } from "../App";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Card from 'react-bootstrap/Card';

export default function DateScheduled(props) {
  const [user] = useContext(UserContext);
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("08:00");
  const [message, setMessage] = useState("");

  function handleSelect(e) {
    setHour(e.target.value);
  }

  function handleInput(e) {
    setDate(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    const dateFormat = {
      dateScheduled: date + " " + hour,
    };

    console.log(dateFormat);

    axios
      .post(
        "http://localhost:8080/api/dateScheduled/" + props.match.params.id,
        dateFormat,
        {
          headers: {
            Authorization: `Bearer ${user.accesstoken}`,
          },
        }
      )
      .then((res) => setMessage(res.data.message));
  }
  console.log(date, hour);
  if (!user.accesstoken) {
    return <Redirect to="/login" />;
  }
  if (message === "Date scheduled added") {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const dateFormated = today.toISOString();
    return (
      <>
        <Alert variant="success mobile-alert widthAlert" >{message}</Alert>
        <form onSubmit={onSubmit}>
          <Card className='input-center bg-light widthAppointmentCard' >
            <h4 className='right70margin' >Diagnosis: </h4>
            <input
              type="date"
              name="yyyy-mm-dd"
              className="form-control m-1 dateWidth"
              value={date}
              onChange={handleInput}
              min={dateFormated.substring(0, 10)}
            />
            <select onChange={handleSelect} className="form-control dateWidth">
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
            </select>
            <Button className='dateScheduledSubmitButton' type="submit">Submit</Button>
          </Card>
        </form>
      </>
    );
  } else {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const dateFormated = today.toISOString();
    return (
      <>
        <form onSubmit={onSubmit}>
          <Card className='input-center bg-light widthAppointmentCard' >
            <h4 className='right70margin' >Diagnosis: </h4>
            <input
              type="date"
              name="yyyy-mm-dd"
              className="form-control m-1 dateWidth"
              value={date}
              onChange={handleInput}
              min={dateFormated.substring(0, 10)}
            />
            <select onChange={handleSelect} className="form-control dateWidth">
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
            </select>
            <Button className='dateScheduledSubmitButton' type="submit">Submit</Button>
          </Card>
        </form>
      </>
    );
  }
}
