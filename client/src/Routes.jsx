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
        this.setState({authenticated: !this.state.authenticated}, () => IN.API.Raw("/industries?format=json")
        .result((r) => console.log(r))
        .error((e) => console.log(e)))
    }

    render() {
        return (
            <Router>
                <div>
                    <NavBar/>
                    <Switch>
                        <Route exact strict path="/" component={Home}></Route>
                        <Route exact strict path="/signin" render={(props) => <SignIn {...props} signIn={this.signIn}/>}></Route>
                        <Route exact strict path="/signup" component={Signup}></Route>
                        <Route exact strict path="/*" component={Error}></Route>
                    </Switch>
                </div>
            </Router>)
    }
}

export default Routes;