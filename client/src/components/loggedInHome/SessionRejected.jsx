import React from 'react';
import { Mutation } from 'react-apollo';
import { Modal, Button } from 'react-bootstrap';
import { UPDATE_SESSION } from '../../gql.js';

const SessionRejected = (props) => {
  const { session } = props
  return (
<div>
  {(session && session.pupil) && 
    <Modal show={true} >
      <Modal.Header closeButton>
        <Modal.Title>Oh no</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4><strong>{session.pupil.username}</strong> has cancelled the {session.type} chat with you!</h4>
      </Modal.Body>
      <Modal.Footer>
      <Mutation mutation={UPDATE_SESSION} variables={{ id: session.id, completed: false }}>
        {updateSession => <Button onClick={updateSession}>Okay</Button>}
        </Mutation>
      </Modal.Footer>
    </Modal>}
  </div>
)}

export default SessionRejected