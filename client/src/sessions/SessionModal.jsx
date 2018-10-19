import React, { Component } from 'react';
import { Button, Modal, Glyphicon, Image } from 'react-bootstrap';
import { Mutation, withApollo } from 'react-apollo';
import { CREATE_SESSION } from '../apollo/gql.js';
import { connect } from 'tls';
import userImage from '../../dist/images/user.png';


export default class SessionModal extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false }
    this.handleHide = this.handleHide.bind(this);
  }

  handleHide() {
    this.setState({ show: false });
  }

  render() { 
    const { user, question } = this.props;
    return (
      <div>
        {user 
          ? 
          <div>
            <Button bsStyle="primary" onClick={() => this.setState({ show: true })}>
              Answer
            </Button>
            <Modal
              show={this.state.show}
              onHide={this.handleHide}
              container={this}
              className="centered"
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  Begin your discussion with {question.user ? question.user.username : ''}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Image src={user.image || userImage} alt="profile picture" />
                <p>{question.description}</p>
              </Modal.Body>
              <Modal.Footer className="centered ">
                <Mutation mutation={CREATE_SESSION} variables={{ type: 'text', question: { connect: { id: question.id }}, expert: {connect: { username: user.username }}, pupil : { connect: { username: question.user.username }}}}>
                  {createSession => (
                    <span>
                    {question.text && 
                      <Button onClick={() => {
                        createSession()
                        this.setState({ show: false })
                      }} 
                      bsStyle="success" >
                        <Glyphicon glyph="comment" /> 
                        Send request to text chat
                      </Button>
                    }</span>
                  )}
                </Mutation>
                <Mutation mutation={CREATE_SESSION} variables={{ type: 'video', question: { connect: { id: question.id }}, expert: {connect: { username: user.username}}, pupil : { connect: { username: question.user.username }}}}>
                  {createSession => (
                    <span>
                      {question.video && 
                        <Button 
                          onClick={() => {
                            createSession()
                            this.setState({ show: false })}} 
                            bsStyle="success" 
                          >
                            <Glyphicon glyph="facetime-video" /> 
                            Send request to video chat
                        </Button>
                      }
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