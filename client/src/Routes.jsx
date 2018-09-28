import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import SignIn from './components/SignIn.jsx';
import Home from './components/Home.jsx';

const Routes = () => (
    <Router>
        <div>
            <Route path="/" strict exact component={Home}></Route>
            <Route path="/signin" strict exact component={SignIn}></Route>
        </div>
    </Router>
)

export default Routes;