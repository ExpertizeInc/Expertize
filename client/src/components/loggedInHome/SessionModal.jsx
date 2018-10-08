import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';



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
    return (
<div>

       <Button bsStyle="primary" onClick={() => this.setState({ show: true })}>
            PICK ME
           </Button>
          <Modal
            show={this.state.show}
            onHide={this.handleHide}
            container={this}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Contained Modal
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id
              ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
          </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleHide}>Close</Button>
            </Modal.Footer>
          </Modal>
          </div>   
    );
  }
}
 