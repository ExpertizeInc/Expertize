import React, { Component } from 'react';
import { Button, Glyphicon} from 'react-bootstrap';
import QuestionForm from './QuestionForm.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import { Link, Route } from 'react-router-dom';

const UserHome = ({ match, user }) => (
  <div>
    {/* will render feed here. 
        will be able to choose one post and pick mode of communication then start session */}
      <Button>
        <Glyphicon glyph="pencil" />
        <Link to={`${match.url}/create`}> Create</Link>
      </Button>
      <Route path={`${match.url}/create`} render={(props) => <QuestionForm {...props} user={user} />} />
      <QuestionFeed user={user} />
    </div>
);

export default UserHome;
