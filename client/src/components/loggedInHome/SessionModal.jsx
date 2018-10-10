import React, { Component } from 'react';
import { Button, Modal, Glyphicon, Well, Grid, Row, Col } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
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
    this.initiateSession = this.initiateSession.bind(this)
  }

  initiateSession() {

  }

  handleHide() {
    this.setState({ show: false });
  }

  render() { 
    const { user, question, match, client } = this.props;
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
          <Button onClick={() => console.log(new Date().toISOString())}>Test</Button>

            <Mutation mutation={CREATE_SESSION} variables={{ type: 'videosa', expert: {connect: { username: user.username}}, pupil : {connect: { username: question.username}}}}>
              {createSession => (
                <span>{question.text && <Link to={`${match.url}/discussion/text/${question.username}`}><Button onClick={()=>console.log('text clicked')} bsStyle="success" ><Glyphicon glyph="comment" /> Start text</Button></Link>
                }</span>
              )}
            </Mutation>
            

            {/* <Mutation mutation={CREATE_SESSION} >
              {createSession => (
                <span>{question.audio && <Link to={`${match.url}/discussion/audio`}><Button onClick={createSession} bsStyle="success" ><Glyphicon glyph="earphone" /> Start audio</Button></Link>
                }</span>
              )}
            </Mutation>

            <Mutation mutation={CREATE_SESSION} >
              {createSession => (
                <span>{question.video && <Link to={`${match.url}/discussion/video`}><Button onClick={createSession} bsStyle="success" ><Glyphicon glyph="facetime-video" /> Start video</Button></Link>
                }</span>
              )}
            </Mutation> */}
         
          </Modal.Footer>
        </Modal>
      </div>   
    );
  }
}

export default SessionModal