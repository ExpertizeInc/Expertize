import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignIn from '../app/SignIn.jsx';
import Home from '../app/Home.jsx';
import Signup from '../app/Signup.jsx';
import NavBar from '../app/NavBar.jsx';
import Chat from '../sessions/Chat.jsx';
import Questionnaire from '../profile/Questionnaire.jsx';
import Profile from '../profile/Profile.jsx'
import Error from '../app/Error.jsx';
import Footer from '../app/Footer.jsx';
import Inbox from '../inbox/Inbox.jsx'
import UserHome from '../app/UserHome.jsx';
// import QuestionFeed from '../feed/QuestionFeed.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Video from '../sessions/Video.jsx';

const Routes = ({ authenticated, user, history, linkedInSignIn, signOut, fbSignIn, client }) => (
    <div className="content">
      <NavBar user={user} authenticated={authenticated} history={history} signOut={signOut} />
      <Switch>
          <Route exact strict path="/" render={(props) => (authenticated ? <Redirect to="/home"/> : <Home {...props} client={client}/>)}></Route>
          <PrivateRoute path='/home' component={UserHome} user={user} authenticated={authenticated} client={client}></PrivateRoute>
          <Route exact strict path="/signin" render={(props) => <SignIn {...props}  fbSignIn={fbSignIn} linkedInSignIn={linkedInSignIn} client={client} />}></Route>
          <Route exact strict path="/signup" render={(props) => <Signup {...props} client={client} linkedInSignIn={linkedInSignIn} />}></Route>
          <Route exact strict path="/questionnaire" render={(props) => <Questionnaire {...props} user={user} client={client} />}></Route>
          <Route exact strict path="/profile" render={(props) => <Profile {...props} user={user} />}></Route>
          <Route exact strict path="/chat" component={Chat}></Route>
          {/* <Route exact strict path="/inbox" component={Inbox}></Route> */}
          <Route exact strict path="/video" component={Video}></Route>
          <Route exact strict path="/*" component={Error}></Route>
      </Switch>
    </div>
);

export default Routes;