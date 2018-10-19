import React from 'react';
import { Mutation } from 'react-apollo';
import { Modal, Button } from 'react-bootstrap';
import { UPDATE_SESSION } from '../apollo/gql.js';
import { Link } from 'react-router-dom';

const SessionAccepted = (props) => { 
  const { session, match } = props
  return (
  <div>
  {(session && session.pupil) && 
    <Modal show={true} >
      <Modal.Header closeButton>
        <Modal.Title>Success!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{session.pupil.username} has accepted the {session.type} chat with you!</h4>
      </Modal.Body>
      <Modal.Footer>
      <Mutation mutation={UPDATE_SESSION} variables={{ id: session.id, completed: true }}>
        {updateSession => (
        <Link to={{pathname:`${match.url}/discussion/${session.type}`, state:{session}}}><Button onClick={() => {updateSession(); props.toggleExpert()}}>Continue to {session.type}</Button></Link>
        )}
        </Mutation>
      </Modal.Footer>
    </Modal>}
  </div>
)}

export default SessionAccepted