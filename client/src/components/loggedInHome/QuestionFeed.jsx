import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { Col, Button, Panel, Grid, Row, Glyphicon } from "react-bootstrap";
// import TopicDropdown from './TagDropdown.jsx';
import { GET_QUESTIONS } from '../../gql.js';
import SessionModal from './SessionModal.jsx'
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
    // console.log('feed user', user)
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
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error{console.log(error)}</div>;
            return (
              <div>
                <Col smOffset={2} sm={8}>
                  {data.questions.map((question, i) => (
                    <div key={i}>
                      <Panel>
                        <Panel.Heading>
                          <Panel.Title componentClass="h3">
                            Title: {question.title} | Tag: {question.tags.length > 1 ? question.tags.map((tag, i) => tag.concat(', '))
                              : 
                              question.tags} 
                              
                          </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                          <Grid>
                            <Row>
                              <Col sm={2}>
                                <div className="hexagon" style={{ backgroundImage: "url('http://placecorgi.com/150')" }}>
                                  <div className="hexTop" />
                                  <div className="hexBottom" />
                                </div>
                                <div>{question.user.username}</div>
                              </Col>
                              <Col sm={3}>{question.description}</Col>
                              <Col sm={2}>
                                {/* i apologize for this code */}
                                <div>{question.text ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="comment" /></Button>
                                  : <Button className="round-btn"><Glyphicon glyph="comment" /></Button>
                                }</div>
                                <div>{question.audio ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="earphone" /></Button>
                                  : <Button className="round-btn"><Glyphicon glyph="earphone" /></Button>
                                }</div>
                                <div>{question.video ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="facetime-video" /></Button>
                                  : <Button className="round-btn"><Glyphicon glyph="facetime-video" /></Button>
                                }</div>
                              </Col>
                              <Col sm={1}>
                                <SessionModal match={match} question={question} user={user} />
                              </Col>
                            </Row>
                          </Grid>
                        </Panel.Body>
                      </Panel>
                    </div>
                  ))}
                </Col>
              </div>
            )
          }}
        </Query>
      </div>
    );
  }
}