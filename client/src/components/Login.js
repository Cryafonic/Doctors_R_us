import "../App.css";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { UserContext } from "../App";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";

// Take the email and password of the user and send it to the back end to be check if it mathes documents in the database.
function Login() {
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // on submit will login the person. if they exist and if the credentians are correct.
  const onSubmit = (e) => {
    e.preventDefault();
    const login = {
      email,
      password,
    };

    axios.post("http://localhost:8080/api/login", login).then((res) => {
      console.log(res.data);
      if (res.data.accesstoken) {
        setUser({
          accesstoken: res.data.accesstoken,
          role: res.data.role,
        });
      } else {
        setMessage(res.data.message);
      }
    });
  };

  const hanldeChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  console.log(user);
  if (user.accesstoken) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <Card className="card bg-light" style={{ width: "30%", height: "1%" }}>
          <form onSubmit={onSubmit}>
            <h2 className="text-center">Login</h2>
            <h5 className="text-center">{message}</h5>
            <div className="input-center">
              <InputGroup className="mb-2 ms-2" style={{ width: "80%" }}>
                <FormControl
                  value={email}
                  onChange={hanldeChange}
                  type="email"
                  name="email"
                  required
                  placeholder="email"
                />
              </InputGroup>
              <InputGroup className="mb-2 ms-2" style={{ width: "80%" }}>
                <FormControl
                  value={password}
                  onChange={hanldeChange}
                  type="password"
                  name="password"
                  required
                  placeholder="password"
                />
              </InputGroup>
            </div>
            <Button className="mb-2 login-button" type="submit">
              Login
            </Button>
            <Link className="float-right" to="/register">
              Register page
            </Link>
          </form>
        </Card>
      </div>
    );
  }
}

export default Login;
