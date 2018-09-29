import React from 'react';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn.jsx';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import NavBar from './components/NavBar.jsx';
import Error from './components/Error.jsx';

class Routes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            authenticated: false
        }
        this.signIn = this.signIn.bind(this)
    }
    signIn() {
        this.setState({authenticated: !this.state.authenticated}, () => console.log(this.state.authenticated))
    }

    // onLinkedInLoad() {
    //     IN.Event.on(IN, "auth", getProfileData);
    // }
    // // Handle the successful return from the API call
    // onSuccess(data) {
    //     console.log(data);
    // }
    // // Handle an error response from the API call
    // onError(error) {
    //     console.log(error);
    // }
    // // Use the API call wrapper to request the member's basic profile data
    // getProfileData() {
    //     IN.API.Raw("/people/~:(id,firstName,lastName,emailAddress,location,industry)?format=json").result(onSuccess).error(onError);
    // }
    // //Log user out
    // logOut() {
    //   IN.User.logout(() => console.log('signed out'))
    // }

    render() {
        return (
            <Router>
                <div>
                    <NavBar/>
                    <Switch>
                        <Route exact strict path="/" component={Home}></Route>
                        <Route exact strict path="/signin" component={SignIn}></Route>
                        <Route exact strict path="/signup" component={Signup}></Route>
                        <Route exact strict path="/*" component={Error}></Route>
                    </Switch>
                </div>
            </Router>)
    }
}

export default Routes;