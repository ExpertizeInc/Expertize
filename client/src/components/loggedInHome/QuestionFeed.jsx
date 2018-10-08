import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  Button,
  ControlLabel,
  Panel,
  Grid,
  Row,
  ToggleButtonGroup,
  ToggleButton,
  Glyphicon
} from 'react-bootstrap';
import TopicDropdown from './TagDropdown.jsx';
import { createQuestion, getQuestions } from '../../gql.js';
import { times, questionInfo, toggleInfo } from './constants.js';
import { assertValidExecutionArguments } from 'graphql/execution/execute';

export default class QuestionFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      tags: [],
      chat: [],
      title: '',
      duration: 0,
      questions: [],
      name: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handleChatChoice = this.handleChatChoice.bind(this);
    this.addTags = this.addTags.bind(this);
  }

  onChange(e, type) {
    e.preventDefault();
    this.setState({ [type]: e.target.value });
  }

  handleChatChoice(e) {
    this.setState({ chat: e });
  }

  addTags(e) {
    if (this.state.tags.length >= 5) {
      alert('No more than 5 tags per question');
    } else {
      this.setState({ tags: [...this.state.tags, e] });
    }
  }

  render() {
    const { user } = this.props;
    const { description, tags, chat, title, duration, name } = this.state;
    const stateValues = [title, name, description];
    return (
      <Form className="form-panel-signup centered" horizontal>
        <h2>{user ? user.username : ''}: Post a Question</h2>
        {questionInfo.map((info, i) => (
          <FormGroup controlId={`formHorizontal${info.name}`} key={info.name}>
            <Col componentClass={ControlLabel} sm={5}>
              {info.info}
            </Col>
            <Col sm={3}>
              <FormControl
                value={stateValues[i]}
                onChange={e => this.onChange(e, info.type.toLowerCase())}
                type={info.type}
                placeholder={info.placeholder}
              />
            </Col>
          </FormGroup>
        ))}
        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={5}>
            <ControlLabel>How long do you want the session to be?</ControlLabel>
          </Col>
          <Col sm={3}>
            <FormControl
              componentClass="select"
              placeholder="Choose duration"
              onChange={e => this.onChange(e, 'duration')}
              value={duration}
            >
              <option value="select">Choose duration</option>
              {times.map(time => <option value={time.value} key={time.value}>{time.name} </option>)}
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col className="right" sm={5}>
            <strong>I'd like to</strong>
          </Col>
          <Col sm={3}>
            <ToggleButtonGroup
              type="checkbox"
              value={chat}
              onChange={this.handleChatChoice}
            >
              {toggleInfo.map(info => (
                <ToggleButton
                  className="mode-toggle"
                  value={info.toLowerCase()}
                  key={info}
                >
                  {info}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Col>

        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={5}>
            <ControlLabel>Add Some Tags</ControlLabel>
          </Col>
          <Col sm={3}>
            <h5>{tags.length > 1 ? tags.map(tag => tag.concat(', ') ) : tags}</h5>
            <br />
            <TopicDropdown userId={user ? user.id : ''} addTags={this.addTags} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={6} sm={3}>
            <Mutation
              mutation={createQuestion}
              variables={{
                userId: user ? user.id : '',
                username: user ? user.username : '',
                description,
                tags,
                coins: 3,
                title,
                text: chat.includes('text'),
                audio: chat.includes('audio'),
                video: chat.includes('video'),
                duration
              }}
              onCompleted={data => console.log('on complete', data)}
            >
              {(createQuestion, { data }) => (
                <Button onClick={createQuestion}>Create Question</Button>
              )}
            </Mutation>
          </Col>
          <br /><br /><br />
          <Query query={getQuestions} >
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error {console.log(error)}</div>;
              return (
                <div>
                  <Col smOffset={2} sm={8}>
                    {data.questions.map((question, i) => (
                      <div key={i}>
                        <Panel>
                          {console.log(question)}
                          <Panel.Heading>
                            <Panel.Title componentClass="h3">
                              Title: {question.title} | Coins: {question.coins.toString()}&nbsp;
                              | Tags: {question.tags && question.tags.length > 1 ? question.tags.map(tag => {tag}) : '' } | Active: {question.active.toString()}&nbsp;
                              | Duration: {question.duration.toString()} minutes
                            </Panel.Title>
                          </Panel.Heading>
                          <Panel.Body>
                            <Grid>
                              <Row>
                                <Col sm={2}>
                                  <div
                                    className="hexagon"
                                    style={{ backgroundImage: "url('http://placecorgi.com/150')" }}
                                  >
                                    <div className="hexTop" />
                                    <div className="hexBottom" />
                                  </div>
                                  <div>{question.username}</div>
                                </Col>
                                <Col sm={3}>{question.description}</Col>
                                <Col sm={2}>
                                  {/* i apologize for this code */}
                                  <div>
                                    {question.text ? (
                                      <Button
                                        bsStyle="success"
                                        className="round-btn"
                                      >
                                        <Glyphicon glyph="comment" />
                                      </Button>
                                    ) : (
                                      <Button className="round-btn">
                                        <Glyphicon glyph="comment" />
                                      </Button>
                                    )}
                                  </div>
                                  <div>
                                    {question.audio ? (
                                      <Button
                                        bsStyle="success"
                                        className="round-btn"
                                      >
                                        <Glyphicon glyph="earphone" />
                                      </Button>
                                    ) : (
                                      <Button className="round-btn">
                                        <Glyphicon glyph="earphone" />
                                      </Button>
                                    )}
                                  </div>
                                  <div>
                                    {question.video ? (
                                      <Button
                                        bsStyle="success"
                                        className="round-btn"
                                      >
                                        <Glyphicon glyph="facetime-video" />
                                      </Button>
                                    ) : (
                                      <Button className="round-btn">
                                        <Glyphicon glyph="facetime-video" />
                                      </Button>
                                    )}
                                  </div>
                                </Col>
                                <Col sm={1}>
                                  <Button>Claim Question</Button>
                                </Col>
                              </Row>
                            </Grid>
                          </Panel.Body>
                        </Panel>
                      </div>
                    ))}
                  </Col>
                </div>
              );
            }}
          </Query>
        </FormGroup>
      </Form>
    );
  }
}
