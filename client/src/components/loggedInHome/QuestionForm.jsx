import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  Button,
  ControlLabel,
  ToggleButtonGroup,
  ToggleButton,
  Glyphicon
} from 'react-bootstrap';
import TagDropdown from './TagDropdown.jsx';
import { createQuestion } from '../../gql.js';
import { times, questionInfo } from './constants.js';

export default class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      tags: [],
      chat: [],
      title: '',
      duration: 0
    };
    this.onChange = this.onChange.bind(this);
    this.addTags = this.addTags.bind(this);
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
  addTags(e) {
    this.setState({ tags: [e, ...this.state.tags] });
  }
  render() {
    const { user } = this.props;
    const {
      description,
      tags,
      chat,
      title,
      duration,
      questions,
      name
    } = this.state;

    console.log(user);

    const stateForQuestionInfo = [title, name, description];
    return (
      // modularize questions
      <Form className="form-panel-signup centered" horizontal>
        <h2>{user.username} - Post a Question</h2>
        {questionInfo.map((question, i) => (
          <FormGroup controlId={`formHorizontal${question.type}`} key={question.info}>
          <Col componentClass={ControlLabel} sm={5}>
            {question.info}
          </Col>
          <Col sm={3}>
            <FormControl
              value={stateForQuestionInfo[i]}
              onChange={e => this.onChange(e, question.type.toLowerCase())}
              type={question.type}
              placeholder={question.placeholder}
            />
          </Col>
        </FormGroup>
        ))}
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={5}>
            Tag
          </Col>
          <Col sm={3}>
            <FormControl
              value={tags}
              onChange={e => this.onChange(e, 'tag')}
              type="tag"
              placeholder="Enter Tag"
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={5}>
            <ControlLabel>How long do you want the session to be?</ControlLabel>
          </Col>
          <Col sm={3}>
            <FormControl
              componentClass="select"
              placeholder="Choose duration"
              onChange={e => this.onChange(e, 'duration')}
              value={this.state.duration}
            >
              <option value="select">Choose duration</option>
              {times.map(time => (
                <option value={time.value} key={time.value}>
                  {time.name}
                </option>
              ))}
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col className="right" sm={5}>
            <strong>I'd like to use</strong>
          </Col>
          <Col sm={3}>
            <ToggleButtonGroup
              type="checkbox"
              value={chat}
              onChange={this.handleChatChoice}
            >
              <ToggleButton className={'mode-toggle'} value={'text'}>
                Text
              </ToggleButton>
              <ToggleButton className={'mode-toggle'} value={'audio'}>
                Audio
              </ToggleButton>
              <ToggleButton className={'mode-toggle'} value={'video'}>
                Video
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={5}>
            <ControlLabel>Add Some Tags</ControlLabel>
          </Col>
          <Col sm={3}>
            <h5>
              {tags.length > 1 ? tags.map(tag => tag.concat(', ')) : tags}
            </h5>
            <br />
            <TagDropdown userId={user ? user.id : ''} addTags={this.addTags} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={6} sm={3}>
            <Mutation
              mutation={createQuestion}
              variables={{
                userId: user.id,
                username: user.username,
                description: description,
                tags: tags,
                coins: 3,
                title: title,
                text: chat.includes('text'),
                audio: chat.includes('audio'),
                video: chat.includes('video'),
                duration: duration
              }}
              onCompleted={data => console.log('on complete', data)}
            >
              {(createQuestion, { data }) => {
                return (
                  <Button onClick={createQuestion}>Create Question</Button>
                );
              }}
            </Mutation>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
