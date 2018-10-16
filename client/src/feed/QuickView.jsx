import React, { Component } from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { CREATE_MESSAGE } from '../apollo/gql.js';

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
          <Button onClick={() => toggleShow()}>Close Me</Button>
          <Mutation
            mutation={ CREATE_MESSAGE }
            variables={{ 
              title: `Hi ${question.user.username}, ${user.username} would like to share their linkedIn Profile with you!`, 
              message: `I would love to connect with you on LinkedIn! Here is my profile: ${user.linkedInProfile}`, 
              recipient: { connect: { username: question.user.username } }, 
              sender: { connect: { username: user.username } } 
            }}>
            {createMessage => {
              return (
                <Row>
                <Col xsOffset={3} sm={3}>
                <Link to="/home/inbox">
                  <Button className="btn-2g bttn" onClick={createMessage}>Send Pupil Your LinkedIn Info</Button>
                </Link></Col></Row>
              );
            }}
        </Mutation>
        
        </Modal.Body>
      </Modal>
    );
  }
}
 