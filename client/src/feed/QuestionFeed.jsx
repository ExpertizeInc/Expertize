import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { Col, Button, Panel, Grid, Row, Glyphicon } from "react-bootstrap";
// import TopicDropdown from './TagDropdown.jsx';
import { GET_QUESTIONS } from '../apollo/gql.js';
import QuestionFeedItem from './QuestionFeedItem.jsx';
import { Link } from 'react-router-dom';
import { userInfo } from "os";


export default class QuestionFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
    this.onChange = this.onChange.bind(this);
    this.handleChatChoice = this.handleChatChoice.bind(this);
  }

  onChange(e, type) {
    e.preventDefault()
    this.setState({ [type]: e.target.value });
  }

  handleChatChoice(e) {
    this.setState({ chat: e });
  }

  render() {
    const { user, match } = this.props;
    return (
    <div>
        <Button>
          <Glyphicon glyph="pencil" />
          <Link to={`${match.url}/create`}>Create</Link>
        </Button>
        <Button>
          <Link to={`${match.url}/discussion`}>chat</Link>
        </Button>
        <Query query={GET_QUESTIONS}>
          {({ loading, error, data }) => {
            if (loading) return <div>Q Loading...</div>;
            if (error) return <div> Error {console.log(error)} </div>;
            return (
            <div>
              <Col smOffset={2} sm={8}>
               {data.questions.map(question => <QuestionFeedItem question={question} user={user} match={match} /> )}
              </Col>
            </div>)
          }}
        </Query>
      </div>)
  }
}