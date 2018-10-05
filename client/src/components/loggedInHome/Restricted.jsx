import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Button, Glyphicon} from 'react-bootstrap';

import Questions from './Questions.jsx';
import { Link } from 'react-router-dom';


export default class Restricted extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Button>
          <Glyphicon glyph="pencil" />
          <Link to="/home/create"> Create</Link>
        </Button>
        <Questions user={this.props.user} />
      </React.Fragment>
    )
  }
}