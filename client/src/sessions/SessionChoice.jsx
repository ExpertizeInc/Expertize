import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { Modal, Button } from 'react-bootstrap';
import { UPDATE_SESSION } from '../apollo/gql.js';
import { Link } from 'react-router-dom';

export default class SessionChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    }
  }

  render() {
    const { session, match } = this.props
    return (
      <div>
      {(session && session.pupil) && 
        <Modal show={true} >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading - SessionChoice.jsx {session.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <h4>{session.expert.username} has selected to {session.type} chat with you!</h4>
            <p>
              Would you like to accept?
            </p>
          </Modal.Body>
          <Modal.Footer>
          <Mutation mutation={UPDATE_SESSION} variables={{ id: session.id, accepted: true }}>
            {updateSession => <Link to={{pathname:`${match.url}/discussion/${session.type}`, state:{session}}}><Button onClick={updateSession}>Accept</Button></Link>}
            </Mutation>
            <Mutation mutation={UPDATE_SESSION} variables={{ id: session.id, accepted: false }}>
            {updateSession =>  <Link to={`${match.url}`}><Button onClick={updateSession}>Reject</Button></Link>}
            </Mutation>
          </Modal.Footer>
        </Modal>}

      </div>
    );
  }
}
 