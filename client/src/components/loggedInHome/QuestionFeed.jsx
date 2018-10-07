import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { Form, FormGroup, FormControl, Col, Button, ControlLabel, Panel, Grid, Row, ToggleButtonGroup, ToggleButton, Glyphicon } from "react-bootstrap";
import TopicDropdown from './TagDropdown.jsx';
import { createQuestion, getQuestions } from '../../gql.js';

export default class QuestionFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      tags: [],
      chat: [],
      title: '',
      duration: 0,
      questions: []
    };
    this.onChange = this.onChange.bind(this);
    this.handleChatChoice = this.handleChatChoice.bind(this);
    this.addTags = this.addTags.bind(this);
  }

  onChange(e, type) {
    e.preventDefault()
    this.setState({ [type]: e.target.value });
  }

  handleChatChoice(e) {
    this.setState({ chat: e });
  }

  addTags(e) {
    this.setState({ tags: [e, ...this.state.tags]});
  }

  render() {
    const { user } = this.props;
    const { description, tags, chat, title, duration, questions, name } = this.state;
    const times = ['5 Minutes', '10 Minutes', '15 Minutes', '20 Minutes', '25 Minutes', '30 Minutes'];
    return (
      <Form className="form-panel-signup centered" horizontal>
        <h2>{user ? user.username : ''}: Post a Question</h2>
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={5}>
            What would you like to discuss?
            </Col>
          <Col sm={3}>
            <FormControl value={title} onChange={e => this.onChange(e, "title")} type="Title" placeholder="Enter Title" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalUsername">
          <Col componentClass={ControlLabel} sm={5}>
            Question Name
            </Col>
          <Col sm={3}>
            <FormControl value={name} onChange={e => this.onChange(e, "name")} type="Name" placeholder="Name" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalUsername">
          <Col componentClass={ControlLabel} sm={5}>
            Include a brief description
            </Col>
          <Col sm={3}>
            <FormControl value={description} onChange={e => this.onChange(e, "description")} type="Description" placeholder="Description" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={5}>
            Tag
            </Col>
          <Col sm={3}>
            <FormControl value={tags} onChange={e => this.onChange(e, "tag")} type="tag" placeholder="Enter Tag" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={5}>
            <ControlLabel>How long do you want the session to be?</ControlLabel>
          </Col>
          <Col sm={3}>
            <FormControl componentClass="select" placeholder="Choose duration" onChange={e => this.onChange(e, "duration")} value={duration}>
              <option value="select">Choose duration</option>
              {times.map(time => (
                <option value={time} key={time}>{time}</option>
              ))}
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col className="right" sm={5}>
            <strong>I'd like to</strong>
          </Col>
          <Col sm={3}>
            <ToggleButtonGroup type="checkbox" value={chat} onChange={this.handleChatChoice}>
              <ToggleButton className={"mode-toggle"} value={"text"}>
                Text
                </ToggleButton>
              <ToggleButton className={"mode-toggle"} value={"audio"}>
                Audio
                </ToggleButton>
              <ToggleButton className={"mode-toggle"} value={"video"}>
                Video
                </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={6} sm={3}>
            <Mutation mutation={createQuestion} 
              variables={{ userId: user ? user.id : '', username: user ? user.username : '', description, tags, coins: 3, title, text: chat.includes("text"), audio: chat.includes("audio"), video: chat.includes("video"), duration }} 
              onCompleted={data => console.log("on complete", data)}
            >
              {(createQuestion, { data }) => <Button onClick={createQuestion}>Create Question</Button>}
            </Mutation>
          </Col>
          <br /><br /><br />
          <Query query={getQuestions}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error{console.log(error)}</div>;
              return (
                <div>
                  <Col smOffset={2} sm={8}>
                    <TopicDropdown userId={user ? user.id : ''} addTags={this.addTags}/>
                    {data.questions.map((question, i) => (
                      <div key={i}>
                        <Panel>
                          <Panel.Heading>
                            <Panel.Title componentClass="h3">
                              Title: {question.title} | Coins: {question.coins} | Tag: {question.tags} | Active: {question.active.toString()}
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
                                  <div>{question.username}</div>
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
                                <Col sm={1}><Button>Claim Question</Button></Col>
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
        </FormGroup>
      </Form>
    );
  }
}