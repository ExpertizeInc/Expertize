import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignIn from './components/SignIn.jsx';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import NavBar from './components/NavBar.jsx';
import Chat from './components/Chat.jsx';
import Questionnaire from './components/Questionnaire.jsx';
import Profile from './components/Profile.jsx'
import Error from './components/Error.jsx';
import Footer from './components/Footer.jsx';
import UserHome from './components/loggedInHome/UserHome.jsx';
import QuestionFeed from './components/loggedInHome/QuestionFeed.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Video from './components/Video.jsx';

const Routes = ({ authenticated, user, signIn, signInLI}) => (
    <div>

      <NavBar user={user} authenticated={authenticated}/>
      <Switch>
          <Route exact strict path="/" render={(props) => (authenticated ? <Redirect to="/home"/> : <Home {...props}/>)}></Route>
          <PrivateRoute path='/home' component={UserHome} user={user} authenticated={authenticated}></PrivateRoute>
          <Route exact strict path="/signin" render={(props) => <SignIn {...props} signInLI={signInLI}/>}></Route>
          <Route exact strict path="/signup" render={(props) => <Signup user={user} {...props} signIn={signIn} />}></Route>
          <Route exact strict path="/questionnaire" render={(props) => <Questionnaire {...props} user={user} />}></Route>
          <Route exact strict path="/profile" render={(props) => <Profile {...props} user={user} />}></Route>
          <Route exact strict path="/home/discussion/chat" component={Chat}></Route>
          <Route exact strict path="/video" component={Video}></Route>
          <Route exact strict path="/*" component={Error}></Route>
      </Switch>
      <Footer />
    </div>
);

export default Routes;