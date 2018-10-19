import React, { Component } from 'react';
import { Button, Modal, Glyphicon, FormControl, Checkbox, ButtonGroup } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import { UPDATE_USER_QUESTION, GET_QUESTIONS } from '../apollo/gql.js';
import userImage from '../../dist/images/user.png';


export default class UpdateQuestionModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      show: false, 
      description: '', 
      title: '', 
      text: null, 
      audio: null, 
      video: null, 
      duration: 5, 
      tag: ''
    }
    this.handleHide = this.handleHide.bind(this);
    this.setDuration = this.setDuration.bind(this);
  }

  componentDidMount() {
    const { question } = this.props;
    if (question) {
      this.setState({ text: question.text, audio: question.audio, video: question.video, tag: question.tag })
    }
  }

  handleHide() {
    this.setState({ show: false });
  }

  setDuration(e) {
    (this.state.duration + e < 35 && this.state.duration + e !== 0) ?
    this.setState({ duration: this.state.duration + e}) : null
  }

  render() { 
    const { user, question } = this.props;
    const { description, title, text, audio, video, duration, tag } = this.state;
    return (
      <div>
        {user 
          ? 
          <div>
            <Button bsStyle="primary" onClick={() => this.setState({ show: true })}>
              Update Question
            </Button>
            <Modal
              show={this.state.show}
              onHide={this.handleHide}
              container={this}
              className="centered"
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  Please Enter What you would like to edit?
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Title: <FormControl text={title} alt="title" onChange={(e) => this.setState({ title: e.target.value})}/> 
                Description: <FormControl text={description} alt="description" onChange={(e) => this.setState({ description: e.target.value})}/>
                <Checkbox text={text} alt="text" onChange={(e) => this.setState({ text: e.target.value ? true : false })}>Text</Checkbox>
                <Checkbox text={audio} alt="audio" onChange={(e) => this.setState({ audio: e.target.value ? true : false})}>Audio</Checkbox>
                <Checkbox text={video} alt="video" onChange={(e) => this.setState({ video: e.target.value ? true : false })}>Video</Checkbox> 
                {/* Duration: <FormControl text={duration} alt="title" onChange={(e) => this.setState({ title: e.target.value})}/> 
                Tag: <FormControl text={tag} alt="title" onChange={(e) => this.setState({ title: e.target.value})}/>  */}
                <ButtonGroup>
                    <Button className={'mode-toggle btn-grp'} onClick={() => this.setDuration(-5)} value="-" key="-">
                      -
                    </Button>
                    <Button  className={'mode-toggle btn-grp'} value={duration} key="test">
                     {duration} minutes
                    </Button>
                    <Button className={'mode-toggle btn-grp'} onClick={() => this.setDuration(5)} value="+"  key="+">
                      +
                    </Button>
                  </ButtonGroup>
              </Modal.Body>
              <Modal.Footer className="centered ">
                <Mutation mutation={UPDATE_USER_QUESTION} 
                  variables={{ id: question.id, text, description, duration, audio, video, title  }}
                  refetchQueries={() => [{ query: GET_QUESTIONS , variables: { username: user.username }} ]}
                >
                  {updateQuestion => (
                    <span>
                    {question.text && 
                      <Button onClick={() => {
                        updateQuestion()
                        this.setState({ show: false })
                      }} 
                      bsStyle="success" >
                        <Glyphicon glyph="comment" /> 
                        Update Question
                      </Button>
                    }</span>
                  )}
                </Mutation>
              </Modal.Footer>
            </Modal>
          </div>
          :
          <div />
          }
        </div> 
      );
    }
};