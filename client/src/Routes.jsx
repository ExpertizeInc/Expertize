import React from 'react';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import SignIn from './components/SignIn.jsx';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import NavBar from './components/NavBar.jsx';

const Routes = () => (
    <Router>
        <div>
            <NavBar/>
            <Route path="/" exact component={Home}></Route>
            <Route path="/signin" component={SignIn}></Route>
            <Route path="/signup" component={Signup}></Route>
        </div>
    </Router>
)

export default Routes;