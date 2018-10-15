import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import {
  Form,
  FormGroup,
  FormControl,
  Grid,
  Row,
  Col,
  Panel,
  Badge,
  Button,
  ControlLabel,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton,
  DropdownButton,
  MenuItem,
  Image
} from 'react-bootstrap';
import TagDropdown from './TagDropdown.jsx';
import { CREATE_QUESTION, GET_QUESTIONS, GET_USER_QUESTIONS, GET_USER_UID } from '../apollo/gql.js';
import { times, questionInfo } from '../constants.js';
import { Link } from 'react-router-dom';

export default class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      tags: [],
      chat: [],
      title: '',
      duration: 5
    };
    this.onChange = this.onChange.bind(this);
    this.addTags = this.addTags.bind(this);
    this.setDuration = this.setDuration.bind(this);
    this.handleChatChoice = this.handleChatChoice.bind(this);
  }

  onChange(e, type) {
    e.preventDefault();
    this.setState({
      [type]: e.target.value
    });
  }
  handleChatChoice(e) {
    this.setState({ chat: e });
  }

  setDuration(e) {
    (this.state.duration + e < 25 && this.state.duration + e !== 0) ?
    this.setState({ duration: this.state.duration + e}) : null
  }

  addTags(e) {
    if (this.state.tags.includes(e)) {
      alert('You have already added this tag')
    } else if (this.state.tags.length >= 5) {
      alert('No more than 5 tags per question please')
    } else {
      this.setState({ tags: [e, ...this.state.tags] });
    }
  }
  render() {
    const { user } = this.props;
    const {
      description,
      tags,
      chat,
      title,
      duration,
      questions
    } = this.state;
    const stateForQuestionInfo = [title, description];
    const toggleInfo = ['Text', 'Audio', 'Video'];
    return (
      // modularize questions
      <Grid>
        <Row>
          <Col xs={6} md={4}>
            <Form className="form-panel-signup centered" horizontal>
              {/* {questionInfo.map((question, i) => (
                <FormGroup
                  controlId={`formHorizontal${question.type}`}
                  key={question.info}>
                  <Col componentClass={ControlLabel} >
                    {question.info}
                  </Col>
                  <Col>
                    <FormControl className="round-input"
                      value={stateForQuestionInfo[i]}
                      onChange={e => this.onChange(e, question.type.toLowerCase())}
                      type={question.type}
                      placeholder={question.placeholder}
                    />
                  </Col>
                </FormGroup>
              ))} */}

              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>What would you like to discuss?</ControlLabel>
                <FormControl onChange={(e) => this.onChange(e, 'title')} style={{ height: "35px" }} className="round-input" componentClass="textarea" placeholder="eg. Python best practices" />
              </FormGroup>

              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Include a brief description.</ControlLabel>
                <FormControl onChange={(e) => this.onChange(e, 'description')}style={{ height: "80px" }}className="round-input" componentClass="textarea" placeholder="eg. I'm just starting to learn Python and was wondering if there are certain pointers someone who has used it in their job could give me." />
              </FormGroup>

              <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} >
                  <ControlLabel>How long do you want the session to be?</ControlLabel>
                </Col>
                <Col>
                  <ButtonGroup>
                    <Button className={'mode-toggle btn-white'} onClick={() => this.setDuration(-5)} value="-" key="-">
                      -
                    </Button>
                    <Button  className={'mode-toggle btn-white'} value={this.state.duration} key="test">
                     {this.state.duration} minutes
                    </Button>
                    <Button className={'mode-toggle btn-white'} onClick={() => this.setDuration(5)} value="+"  key="+">
                      +
                    </Button>
                  </ButtonGroup>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col className="centered" >
                  <strong>I'd like to use</strong>
                </Col>
                <Col>
                  <ToggleButtonGroup
                    type="checkbox"
                    value={chat}
                    onChange={this.handleChatChoice}>
                    {toggleInfo.map(info => (
                      <ToggleButton
                        className={'mode-toggle'}
                        value={info.toLowerCase()}
                        key={info}>
                        {info}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel}>
                  <ControlLabel>Add Some Tags</ControlLabel>
                </Col>
                <Col>
                  <h5>
                    {tags.length > 1 ? tags.map(tag => <Badge>{tag}</Badge>) : <Badge>{tags}</Badge>}
                  </h5>
                  <TagDropdown userId={user ? user.id : ''} addTags={this.addTags} />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col className="centered">
                  <h5 className="centered">This will cost: {user.debt > 0 ? 2 + user.debt : 2} <Image style={{ width: "20px" }} src="../images/coin.gif"></Image></h5>
                  <h5>You have: {user.coins}<Image style={{ width: "20px" }} src="../images/coin.gif"></Image></h5>
                  <Mutation
                    mutation={ CREATE_QUESTION }
                    variables={{
                      id: user.id,
                      user: { connect: { username: user.username }},
                      description,
                      tags,
                      debt: user.coins >= (user.debt > 0 ? 2 + user.debt : 2) ? 0 : user.coins - (user.debt > 0 ? 2 + user.debt : 2) - user.debt,
                      userCoins: user.coins - (user.debt > 0 ? 2 + user.debt : 2),
                      coins: user.debt > 0 ? 2 + user.debt : 2,
                      title,
                      text: chat.includes('text'),
                      audio: chat.includes('audio'),
                      video: chat.includes('video'),
                      duration}} 
                      refetchQueries={() => [{ query: GET_USER_UID , variables: { uid: user.uid }}, { query: GET_QUESTIONS },{ query: GET_USER_QUESTIONS, variables: { username: user.username } }  ]}
                      >
                    {createQuestion => {
                      return (
                        <Link to="/home">
                          <Button className="btn-2g bttn" onClick={createQuestion}>Create Question</Button>
                        </Link>
                      );
                    }}
                  </Mutation>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
};
