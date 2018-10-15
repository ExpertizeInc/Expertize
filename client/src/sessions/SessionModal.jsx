import React, { Component } from 'react';
import { Button, Modal, Glyphicon, Well, Grid, Row, Col } from 'react-bootstrap';
import { Mutation, withApollo } from 'react-apollo';
import { CREATE_SESSION } from '../apollo/gql.js';
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
        <React.Fragment>
          {console.log('sessioinmodal',this.props)}
        {user 
          ? 
          <React.Fragment>
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
                  Begin your discussion with {question.user.username} - SessionModal.jsx
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="hexagon centered" style={{ backgroundImage: "url('http://placecorgi.com/150')" }}>
                  <div className="hexTop centered" />
                  <div className="hexBottom centered" />
                </div>
                <div><h2></h2></div>
                <Well>{question.description}</Well>
              </Modal.Body>
              <Modal.Footer className="centered ">

                <Mutation mutation={CREATE_SESSION} variables={{ type: 'text', question: { connect: { id: question.id }}, expert: {connect: { username: user.username}}, pupil : {connect: { username: question.user.username}}}}>
                  {createSession => (
                    // <span>{question.text && <Link to={`${match.url}/discussion/text/${question.username}`}><Button onClick={()=>console.log('text clicked')} bsStyle="success" ><Glyphicon glyph="comment" /> Start text</Button></Link>
                    <span>{question.text && <Button onClick={() => {createSession()
                    this.setState({ show: false }, () => console.log('session was created'))}} bsStyle="success" ><Glyphicon glyph="comment" /> Send request to text chat</Button>
                    }</span>
                  )}
                </Mutation>
                
                <Mutation mutation={CREATE_SESSION} variables={{ type: 'video', question: { connect: { id: question.id }}, expert: {connect: { username: user.username}}, pupil : {connect: { username: question.user.username}}}}>
                  {createSession => (
                    <span>{question.video && <Button onClick={() => {createSession()
                      this.setState({ show: false })}} bsStyle="success" ><Glyphicon glyph="comment" />Send request to video chat</Button>
                    }</span>
                  )}
                </Mutation>
              </Modal.Footer>
            </Modal>
          </React.Fragment>
          :
          <div></div>
          }
          </React.Fragment> 
        
    );
  }
}

export default SessionModal