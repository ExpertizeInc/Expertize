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
  ListGroup,
  ListGroupItem,
  Image
} from 'react-bootstrap';
import TagDropdown from './TagDropdown.jsx';
import { CREATE_QUESTION, GET_FILTERED_QUESTIONS, GET_USER_QUESTIONS, GET_USER_UID } from '../apollo/gql.js';
import { times, questionInfo } from '../constants.js';
import { Link } from 'react-router-dom';

export default class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      tag: '',
      chat: [],
      title: '',
      duration: 5
    };
    this.onChange = this.onChange.bind(this);
    this.addTag = this.addTag.bind(this);
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
    (this.state.duration + e < 35 && this.state.duration + e !== 0) ?
    this.setState({ duration: this.state.duration + e}) : null
  }

  addTag(e) {
    console.log('deeeeee', e)
    this.setState({ tag: e });
  }
  render() {
    const { user, status, order, client } = this.props;
    const {
      description,
      tag,
      chat,
      title,
      duration,
      questions
    } = this.state;
    const stateForQuestionInfo = [title, description];
    const toggleInfo = ['Text', 'Audio', 'Video'];
    return (
          <Panel>
          <Panel.Heading className="centered">
        <Panel.Title componentClass="h3">
        </Panel.Title>
          <h1><strong>Create a question</strong></h1>
      </Panel.Heading>
          <ListGroup>
            <ListGroupItem className="centered">
           
            <Form className="form-panel-signup centered" horizontal style={{paddingLeft: 40}}>
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
                    <Button className={'mode-toggle btn-grp'} onClick={() => this.setDuration(-5)} value="-" key="-">
                      -
                    </Button>
                    <Button  className={'mode-toggle btn-grp'} value={this.state.duration} key="test">
                     {this.state.duration} minutes
                    </Button>
                    <Button className={'mode-toggle btn-grp'} onClick={() => this.setDuration(5)} value="+"  key="+">
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
                        className={'mode-toggle btn-grp'}
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
                  <ControlLabel>Add A Tag</ControlLabel>
                </Col>
                <Col>
                  <h5>
                    <Badge>{tag}</Badge>
                  </h5>
                  <TagDropdown userId={user ? user.id : ''} client={client} addTag={this.addTag} />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col className="centered">
                  <h5 className="centered">This will cost: {user.debt > 0 ? 2 + user.debt : 2} <Image style={{ width: "20px" }} src="../../images/coin.gif"></Image></h5>
                  <div style={{ fontSize: "10px", color: "grey"}}>{user.debt > 0 ? (`You're ${user.debt} coins in debt!`).toUpperCase() : ''}</div>
                  <Mutation
                    mutation={ CREATE_QUESTION }
                    variables={{
                      id: user.id,
                      user: { connect: { username: user.username }},
                      description,
                      tag: { connect: { name: tag }},
                      debt: user.coins >= (user.debt > 0 ? 2 + user.debt : 2) ? 0 : user.coins - (user.debt > 0 ? 2 + user.debt : 2) - user.debt,
                      userCoins: user.coins - (user.debt > 0 ? 2 + user.debt : 2),
                      coins: user.debt > 0 ? 2 + user.debt : 2,
                      title,
                      text: chat.includes('text'),
                      audio: chat.includes('audio'),
                      video: chat.includes('video'),
                      duration
                    }} 
                      refetchQueries={() => [{ query: GET_USER_UID , variables: { uid: user.uid }} ]}
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
            </ListGroupItem>
          </ListGroup>
          <Panel.Body style={{ backgroundColor: "#f5f5f5"}}>
      </Panel.Body>
          </Panel>

    );
  }
};
