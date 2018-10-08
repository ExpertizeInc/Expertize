import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Button, Glyphicon} from 'react-bootstrap';

import QuestionFeed from './QuestionFeed.jsx';
import { Link } from 'react-router-dom';


export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        {/* will render feed here. 
        will be able to choose one post and pick mode of communication then start session */}
        <Button>
          <Glyphicon glyph="pencil" />
          <Link to="/home/create">Create</Link>
        </Button>
        <QuestionFeed user={this.props.user} />
      </React.Fragment>
    )
  }
}