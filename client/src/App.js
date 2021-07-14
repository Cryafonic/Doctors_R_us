import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import React, {useState} from 'react';
import { HashRouter as Router, Route } from "react-router-dom";

//components 
import AppointmentList from './components/AppointmentList';
import { NavBar }  from './components/NavBar';
import AppointmentCreate from "./components/AppointmentCreate";
import AppointmentEdit from "./components/AppointmentEdit";
import Login from './components/Login';
import Register from './components/Register';
import DocRegister from './components/DocRegister';
import Diagnosis from './components/Diagnosis';
import DateScheduled from './components/DateScheduled';


export const UserContext = React.createContext([]);

function App() {
  const [user, setUser] = useState({});

  function Logout() {
    window.location = '/';
  }
  console.log(user);

  // renders the router with all routes it can to.
  return ( 
    <UserContext.Provider value={[user, setUser]} >
      <div>
        <Router>
          <NavBar logout={Logout} />
          <Route path="/" exact component={AppointmentList} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/doctor/register" exact component={DocRegister} />
          <Route path="/edit/:id" exact component={AppointmentEdit} />
          <Route path="/add" exact component={AppointmentCreate} />
          <Route path="/diagnosis/:id" exact component={Diagnosis} />
          <Route path="/dateScheduled/:id" exact component={DateScheduled} />
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
