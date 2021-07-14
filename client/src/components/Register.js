import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Card from 'react-bootstrap/Card';

// if user does not have a login they can navigate to the register and create a login for themselfs.
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurename] = useState("");
  const [message, setMessage] = useState("");

  // registers the person on submit
  const onSubmit = (e) => {
    e.preventDefault();
    const register = {
      email,
      password,
      name,
      surname,
    };

    axios
      .post("http://localhost:8080/api/patient/register", register)
      .then((res) => {
        console.log(res.data);
        if (res.data.message) {
          setMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.email);
      });
  };

  const hanldeChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);
    } else {
      setSurename(value);
    }
  };
    // checks for what page to render
  if (message === "registerd") {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        <form onSubmit={onSubmit}>
        <Card className="input-center card bg-light docCard" >
          <h2 className='h2Reg' >Register:</h2>

          <InputGroup className="mb-2 ms-2 docSet50" >
            <FormControl
              value={email}
              onChange={hanldeChange}
              type="email"
              name="email"
              required
              placeholder="Email"
            />
        </InputGroup>
        <InputGroup className="mb-2 ms-2 docSet50" >
            <FormControl
              value={password}
              onChange={hanldeChange}
              type="password"
              name="password"
              required
              placeholder="Password"
            />
            </InputGroup>
            <InputGroup className="mb-2 ms-2 docSet50" >
            <FormControl
              value={name}
              onChange={hanldeChange}
              type="text"
              name="name"
              required
              placeholder="Name"
            />
            </InputGroup>
            <InputGroup className="mb-2 ms-2 docSet50" >
            <FormControl
              value={surname}
              onChange={hanldeChange}
              type="text"
              name="surname"
              required
              placeholder="Surname"
            />
          </InputGroup>
          <Button type="submit" className='docSubmitButton' >Register</Button>
          </Card>
        </form>
        
      </div>
    );
  }
}

export default Register;
