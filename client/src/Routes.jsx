import React from 'react';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import SignIn from './components/SignIn.jsx';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import NavBar from './components/NavBar.jsx';
// import Footer from './components/Footer.jsx';
import Chat from './components/Chat.jsx';
import Questionaire from './components/Questionaire.jsx';
import Profile from './components/Profile.jsx'
import Error from './components/Error.jsx';
import Restricted from './components/loggedInHome/Restricted.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Video from './components/Video.jsx';

export const Routes = ({ authenticated, user, signIn, signInLI}) => (
    <React.Fragment>
      <NavBar authenticated={authenticated}/>
      <Switch>
          <Route exact strict path="/" render={() => (authenticated ? <Redirect to="/home"/> : <Home/>)}></Route>
          <PrivateRoute path='/home' component={Restricted} user={user} authenticated={authenticated}></PrivateRoute>
          <Route exact strict path="/signin" render={(props) => <SignIn {...props} signInLI={signInLI}/>}></Route>
          <Route exact strict path="/signup" render={() => <Signup user={user} signIn={signIn} />}></Route>
          <Route exact strict path="/questionaire" render={() => <Questionaire user={user} />}></Route>
          <Route exact strict path="/profile" render={() => <Profile user={user} />}></Route>
          <Route exact strict path="/chat" component={Chat}></Route>
          <Route exact strict path="/video" component={Video}></Route>
          <Route exact strict path="/*" component={Error}></Route>
      </Switch>
      {/* <Footer /> */}
    </React.Fragment>
        )

export default Routes;