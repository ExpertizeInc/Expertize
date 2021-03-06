import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignIn from '../app/SignIn.jsx';
import Home from '../app/Home.jsx';
import Signup from '../app/Signup.jsx';
import NavBar from '../app/NavBar.jsx';
import Questionnaire from '../profile/Questionnaire.jsx';
import Error from '../app/Error.jsx';
import Faq from '../app/Faq.jsx';
import Bio from '../app/Bio.jsx';
import UserHome from '../app/UserHome.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const Routes = ({ authenticated, user, history, linkedInSignIn, signOut, fbSignIn, client, addFirebaseUser }) => (
    <div className="content">
      <NavBar user={user} authenticated={authenticated} history={history} signOut={signOut} />
      <Switch>
          <Route exact strict path="/" render={(props) => (authenticated ? <Redirect to="/home"/> : <Home {...props} client={client}/>)}></Route>
          <PrivateRoute path='/home' component={UserHome} user={user} authenticated={authenticated} history={history} client={client}></PrivateRoute>
          <Route exact strict path="/signin" render={(props) => <SignIn {...props}  fbSignIn={fbSignIn} linkedInSignIn={linkedInSignIn} client={client} />}></Route>
          <Route exact strict path="/signup" render={(props) => <Signup {...props} history={history} addFirebaseUser={addFirebaseUser} client={client} linkedInSignIn={linkedInSignIn} fbSignIn={fbSignIn}/>}></Route>
          <Route exact strict path="/faq" component={Faq}></Route>
          <Route exact strict path="/aboutus" component={Bio}></Route>
          <Route exact strict path="/questionnaire" render={(props) => <Questionnaire {...props} user={user} client={client} history={history} />}></Route>
          <Route exact strict path="/*" component={Error}></Route>
      </Switch>
    </div>
);

export default Routes;