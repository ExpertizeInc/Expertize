import React, { Component } from 'react';
import QuestionForm from './QuestionForm.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import Discussion from './Discussion.jsx';
import { Link, Route, Switch } from 'react-router-dom';

const UserHome = ({ match, user }) => (
  <div>
    <Switch>
    <Route path={`${match.url}/create`} render={() => <QuestionForm user={user} />} />
    <Route path={`${match.url}/discussion`} render={({match}) => <Discussion user={user} match={match} />} />
    <QuestionFeed match={match} user={user} />
    </Switch>
  </div>
);

export default UserHome;
