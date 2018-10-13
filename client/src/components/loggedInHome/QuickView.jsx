import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';


export default class QuickView extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    let { user } = this.props
    return (
      <Modal className="centered" show={this.props.show} >
      <Modal.Header>
        <Modal.Title>{user.username}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{user.description}</h4>
       <Button onClick={() => this.props.toggleShow()}>CLOSE ME</Button>
      </Modal.Body>
    </Modal>
    );
  }
}
 