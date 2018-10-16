import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';


export default class QuickView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { user, show, toggleShow, question } = this.props
    return (
      <Modal className="centered" show={show} >
        <Modal.Header>
          <Modal.Title>Pupil: {question.user.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* add info description to sender and tags */}
          <Modal.Body>Pupil Info: {question.user.description}</Modal.Body>
          <Button onClick={() => toggleShow()}>Message {question.user.username}</Button>
          <Button onClick={() => toggleShow()}>Send LinkedIn Information</Button>
          <Button onClick={() => toggleShow()}>Close Me</Button>
        </Modal.Body>
      </Modal>
    );
  }
}
 