import React, { Component } from 'react';
import { Button, Modal, Glyphicon, FormControl, Checkbox, ButtonGroup, Badge } from 'react-bootstrap';
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
    }
    this.handleHide = this.handleHide.bind(this);
    this.setDuration = this.setDuration.bind(this);
  }

  componentDidMount() {
    const { question } = this.props;
    if (question) {
      this.setState({ text: question.text, audio: question.audio, video: question.video, tag: question.tag ? question.tag.name : '' })
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
    const { user, question, client } = this.props;
    const { description, title, text, audio, video, duration } = this.state;
    return (
      <div>
        {user 
          ? 
          <div>
            <Button bsStyle="primary" onClick={() => this.setState({ show: true })}>
              Update
            </Button>
            <Modal
              show={this.state.show}
              onHide={this.handleHide}
              container={this}
              className="centered"
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  Please enter the fields you would like to edit
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Title: <FormControl text={title} alt="title" onChange={(e) => this.setState({ title: e.target.value})}/> 
                Description: <FormControl text={description} alt="description" onChange={(e) => this.setState({ description: e.target.value})}/>
                <Checkbox text={text === null ? false : text === true ? 'on' : 'off' } alt="text" onChange={(e) => this.setState({ text: e.target.value === 'on' ? true : false })}>Text</Checkbox>
                <Checkbox text={audio === null ? false : audio === true ? 'on' : 'off' } alt="audio" onChange={(e) => this.setState({ audio: e.target.value === 'on' ? true : false})}>Audio</Checkbox>
                <Checkbox text={video === null ? false : video === true ? 'on' : 'off' } alt="video" onChange={(e) => this.setState({ video: e.target.value === 'on' ? true : false })}>Video</Checkbox> 
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
                </ButtonGroup><br/>
              </Modal.Body>
              <Modal.Footer className="centered ">
                <Mutation mutation={UPDATE_USER_QUESTION} 
                    variables={{ 
                      id: question.id, 
                      description: description !== '' ? description : question.description, 
                      duration: duration === question.duration ? question.duration : duration, 
                      text: text !== null ? text : question.text, 
                      audio: audio !== null ? audio : question.audio, 
                      video: video !== null ? video : question.video, 
                      title: title !== '' ? title : question.title,
                    }}
                    refetchQueries={() => [{ query: GET_QUESTIONS , variables: { username: user.username }} ]}
                  >
                    {updateUserQuestion => (
                      <span>
                        <Button onClick={() => {
                          updateUserQuestion()
                          this.setState({ show: false })
                        }} 
                        bsStyle="success" >
                          <Glyphicon glyph="comment" /> 
                          Update Question
                        </Button>
                      </span>
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