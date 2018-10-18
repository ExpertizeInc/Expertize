import React from 'react';
import { Mutation } from 'react-apollo';
import { Modal, Button } from 'react-bootstrap';
import { DELETE_SESSION } from '../apollo/gql.js';
import { Link } from 'react-router-dom'

const SessionRejected = (props) => {
  const { session, match } = props
  return (
<div>
  {(session && session.pupil) && 
    <Modal show={true} >
      <Modal.Header closeButton>
        <Modal.Title>Oh no</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4><strong>{session.pupil.username}</strong> has cancelled the {session.type} chat with you! id:{session.id}</h4>
      </Modal.Body>
      <Modal.Footer>
      <Mutation mutation={DELETE_SESSION} variables={{ id: session.id }}>
        {deleteSession => <Link to={match.url}><Button onClick={deleteSession}>Okay</Button></Link>}
        </Mutation>
      </Modal.Footer>
    </Modal>}
  </div>
)}

export default SessionRejected