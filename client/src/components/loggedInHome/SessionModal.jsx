import React, { Component } from 'react';
import { Button, Modal, Glyphicon, Well, Grid, Row, Col } from 'react-bootstrap';
import { Mutation, withApollo } from 'react-apollo';
import { CREATE_SESSION } from '../../gql.js';
import { connect } from 'tls';


class SessionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    this.handleHide = this.handleHide.bind(this);
  }

  handleHide() {
    this.setState({ show: false });
  }

  render() { 
    const { user, question } = this.props;
    return (
      <div >
        <Button bsStyle="primary" onClick={() => this.setState({ show: true })}>
          PICK ME
           </Button>
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          container={this}
          className="centered"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Begin your discussion with {question.username}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="hexagon centered" style={{ backgroundImage: "url('http://placecorgi.com/150')" }}>
              <div className="hexTop centered" />
              <div className="hexBottom centered" />
            </div>
            <div><h2>{question.username}</h2></div>
            <Well>{question.description}</Well>
          </Modal.Body>
          <Modal.Footer className="centered ">

            <Mutation mutation={CREATE_SESSION} variables={{ type: 'text', expert: {connect: { username: user.username}}, pupil : {connect: { username: question.username}}}}>
              {createSession => (
                <span>{question.text && <Button onClick={() => {createSession()
                this.setState({ show: false })}} bsStyle="success" ><Glyphicon glyph="comment" /> Send request to text chat</Button>
                }</span>
              )}
            </Mutation>
            
            <Mutation mutation={CREATE_SESSION} variables={{ type: 'video', expert: {connect: { username: user.username}}, pupil : {connect: { username: question.username}}}}>
              {createSession => (
                <span>{question.video && <Button onClick={() => {createSession()
                  this.setState({ show: false })}} bsStyle="success" ><Glyphicon glyph="comment" />Send request to video chat</Button>
                }</span>
              )}
            </Mutation>
         
          </Modal.Footer>
        </Modal>
      </div>   
    );
  }
}

export default SessionModal