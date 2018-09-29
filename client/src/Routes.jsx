import React from 'react';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn.jsx';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx'
import Questionaire from './components/Questionaire.jsx';
import Profile from './components/Profile.jsx'
import Error from './components/Error.jsx';

const Routes = () => (
    <Router>
        <div>
            <NavBar/>
            <Switch>
                <Route exact strict path="/" component={Home}></Route>
                <Route exact strict path="/signin" component={SignIn}></Route>
                <Route exact strict path="/signup" component={Signup}></Route>
                <Route exact strict path="/questionaire" component={Questionaire}></Route>
                <Route exact strict path="/profile" component={Profile}></Route>
                <Route exact strict path="/*" component={Error}></Route>
            </Switch>
            <Footer />
        </div>
    </Router>
)

export default Routes;