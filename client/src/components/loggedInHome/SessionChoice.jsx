import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo';
import { Modal, Button } from 'react-bootstrap';
import { GET_UNACCEPTED_SESSIONS, UPDATE_SESSION } from '../../gql.js';



export default class SessionChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    }
  }

  render() {
    const { hideNotification, session } = this.props
    return (
      <div>
      {(session && session.pupil) && 
        <Modal show={true} >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <h4>{session.expert.username} has selected to {session.type} chat with you!</h4>
            <p>
              Would you like to accept?
            </p>
          </Modal.Body>
          <Modal.Footer>
          <Mutation mutation={UPDATE_SESSION} variables={{ id: session.id, accepted: true }}>
            {updateSession => (
            <Button onClick={() => {
              updateSession()
              hideNotification()
            }}>Accept</Button>
            )}
            </Mutation>
            <Mutation mutation={UPDATE_SESSION} variables={{ id: session.id, accepted: false }}>
            {updateSession => (
            <Button onClick={() => {
              updateSession()
              hideNotification()
            }}>Reject</Button>
            )}
            </Mutation>
          </Modal.Footer>
        </Modal>}

      </div>
    );
  }
}
 