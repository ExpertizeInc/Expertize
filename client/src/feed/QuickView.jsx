import React, { Component } from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { CREATE_MESSAGE } from '../apollo/gql.js';
import userImage from '../../dist/images/user.png';


export default class QuickView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { user, show, toggleShow, question } = this.props
    return (
      <Modal className="centered" show={show} onHide={toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title>{question.user.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="centered">
            {/* add info description to sender and tags */}
            <img src={question.user.image || userImage} style={{ height: 100, width: 100 }} onClick={() => this.toggleShow()} />

          <Modal.Body>{question.user.description}</Modal.Body>
          <Link to="/home/inbox">
          <Button className="btn-2g bttn" onClick={() => toggleShow()}>Message {question.user.username}</Button>
          </Link>
          <Mutation
            mutation={ CREATE_MESSAGE }
            variables={{ 
              title: `Hi ${question.user.username}, ${user.username} would like to share their LinkedIn profile with you!`, 
              message: `I would love to connect with you on LinkedIn! Here is my profile: ${user.linkedInProfile}`, 
              recipient: { connect: { username: question.user.username } }, 
              sender: { connect: { username: user.username } } 
            }}
            onCompleted={toggleShow}>
            {createMessage => {
              return (
                  <Button className="btn-2g bttn" onClick={createMessage}>Send LinkedIn</Button>
              );
            }}
        </Mutation>
        
        </Modal.Body>
      </Modal>
    );
  }
}
 