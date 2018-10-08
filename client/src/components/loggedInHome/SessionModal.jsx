import React, { Component } from 'react';
import { Button, Modal, Glyphicon, Well, Grid, Row, Col } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import { CREATE_SESSION } from '../../gql.js';


export default class SessionStartModal extends Component {
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
    const { user, question, match } = this.props;
    return (
      <div className="container centered">
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
          
            <span>{question.text && <Button bsStyle="success" ><Glyphicon glyph="comment" /><Link to={`${match.url}/discussion/text`}> Start text</Link></Button>
            }</span>
            <span>{question.audio && <Button bsStyle="success" ><Glyphicon glyph="earphone" /><Link to={`${match.url}/discussion/audio`}> Start audio</Link></Button>
            }</span>
            <span>{question.video && <Button bsStyle="success" ><Glyphicon glyph="facetime-video" /><Link to={`${match.url}/discussion/video`}> Start video</Link></Button>
            }</span>
         
          </Modal.Footer>
        </Modal>
      </div>   
    );
  }
}
 