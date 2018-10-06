import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
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
  Glyphicon,
} from "react-bootstrap";
import gql from "graphql-tag";
import TopicDropdown from './TopicDropdown.jsx';

const createQuestion = gql`
 mutation createQuestion($userId: String!, $username: String!, $description: String!, $tag: String!, $coins: Int!, $title: String!, $text: Boolean!, $audio: Boolean!, $video: Boolean!, $duration: Int!) {
   createQuestion(userId: $userId, username: $username, description: $description, tag: $tag, coins: $coins, title: $title, text: $text, audio: $audio, video: $video, duration: $duration) {
     description
     tag
     coins
     title
   }
 }
`

const getQuestions = gql`
 query {
   questions{
     username
     description
     tag
     active
     coins
     title
     text
     audio
     video
     duration
   }
 }
`
export default class QuestionFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      tag: '',
      chat: [],
      title: '',
      questions: [],
      duration: 0
    };
    this.onChange = this.onChange.bind(this);
    this.handleChatChoice = this.handleChatChoice.bind(this)
  }

  onChange(e, type) {
    e.preventDefault()
    this.setState({
      [type]: e.target.value
    })
  }

  handleChatChoice(e) {
    this.setState({ chat: e })
  }

  render() {
    return <Form className="form-panel-signup centered" horizontal>
      {console.log("question user", this.props.user)}
      <h2>{this.props.user.username} - Post a Question</h2>
      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={5}>
          What would you like to discuss?
          </Col>
        <Col sm={3}>
          <FormControl value={this.state.title} onChange={e => this.onChange(e, "title")} type="Title" placeholder="Enter Title" />
        </Col>
      </FormGroup>
      <FormGroup controlId="formHorizontalUsername">
        <Col componentClass={ControlLabel} sm={5}>
          Question Name
          </Col>
        <Col sm={3}>
          <FormControl value={this.state.name} onChange={e => this.onChange(e, "name")} type="Name" placeholder="Name" />
        </Col>
      </FormGroup>
      <FormGroup controlId="formHorizontalUsername">
        <Col componentClass={ControlLabel} sm={5}>
          Include a brief description
          </Col>
        <Col sm={3}>
          <FormControl value={this.state.description} onChange={e => this.onChange(e, "description")} type="Description" placeholder="Description" />
        </Col>
      </FormGroup>
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={5}>
          Tag
          </Col>
        <Col sm={3}>
          <FormControl value={this.state.tag} onChange={e => this.onChange(e, "tag")} type="tag" placeholder="Enter Tag" />
        </Col>
      </FormGroup>
      <FormGroup controlId="formControlsSelect">
        <Col componentClass={ControlLabel} sm={5}>
          <ControlLabel>How long do you want the session to be?</ControlLabel>
        </Col>
        <Col sm={3}>
          <FormControl componentClass="select" placeholder="Choose duration" onChange={e => this.onChange(e, "duration")} value={this.state.duration}>            <option value="select">Choose duration</option>
            <option value="5">5 Minutes</option>
            <option value="10">10 Minutes</option>
            <option value="15">15 Minutes</option>
            <option value="20">20 Minutes</option>
            <option value="25">25 Minutes</option>
            <option value="30">30 Minutes</option>
          </FormControl>
        </Col>
      </FormGroup>
      <FormGroup>
        <Col className="right" sm={5}>
          <strong>I'd like to</strong>
        </Col>
        <Col sm={3}>
          <ToggleButtonGroup type="checkbox" value={this.state.chat} onChange={this.handleChatChoice}>
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
          <Mutation mutation={createQuestion} variables={{ userId: this.props.user.id, username: this.props.user.username, description: this.state.description, tag: this.state.tag, coins: 3, title: this.state.title, text: this.state.chat.includes("text"), audio: this.state.chat.includes("audio"), video: this.state.chat.includes("video"), duration: this.state.duration }} onCompleted={data => console.log("on complete", data)}>
            {(createQuestion, { data }) => {
              return <Button onClick={createQuestion}>
                Create Question
                  </Button>;
            }}
          </Mutation>
        </Col>
        <br />
        <br />
        <br />
        <Query query={getQuestions}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>;
            if (error) return <div>Error{console.log(error)}</div>;
            // if (data) this.setState({ questions: data.questions })
            return <div>
              <Col smOffset={2} sm={8}>
                {console.log(data)}
                <TopicDropdown />
                {data.questions.map((question, i) => <div key={i}>
                  <Panel>
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">
                        Title: {question.title} | Coins: {question.coins} | Tag: {question.tag} | Active: {question.active.toString()}
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
                          <Col sm={1}>
                            <Button>PICK ME</Button>
                          </Col>
                        </Row>
                      </Grid>
                    </Panel.Body>
                  </Panel>
                </div>)}
              </Col>
            </div>;
          }}
        </Query>
      </FormGroup>
    </Form>;
  }
}