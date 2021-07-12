import "../App.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { UserContext } from "../App";
import Image from "react-bootstrap/Image";

// Helps the user naviagte through the webpages.
function NavBar({ logout }) {
  const [user] = useContext(UserContext);

  if (!user.accesstoken) {
    return (
      <Navbar bg="dark" variant="dark">
        <Image src="hosLogo.png" className='navImage' rounded />
        <Nav>
          <Link className="links m-2" to="/login">
            Login
          </Link>
          <Link className="links m-2" to="/">
            Appointments
          </Link>
        </Nav>
      </Navbar>
    );
  } else {
    return (
      <Navbar bg="dark" variant="dark">
        <Image src="hosLogo.png" className='navImage' rounded />
        <Nav>
          <Link className="links m-2" to="/">
            Appointments
          </Link>
        </Nav>
        <Button className="logout-button" variant="danger" onClick={() => {logout()}}>
          Logout
        </Button>
      </Navbar>
    );
  }
}

export { NavBar };
