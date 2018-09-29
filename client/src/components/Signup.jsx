import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel } from 'react-bootstrap'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() { 
    return (

<Form className="form-panel-signup" horizontal>

  <FormGroup controlId="formHorizontalUsername">
    <Col componentClass={ControlLabel} sm={4}>
      Username
    </Col>
    <Col sm={3}>
      <FormControl type="username" placeholder="Username" />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalEmail">
    <Col componentClass={ControlLabel} sm={4}>
      Email
    </Col>
    <Col sm={3}>
      <FormControl type="email" placeholder="Email" />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalPassword">
    <Col componentClass={ControlLabel} sm={4}>
      Password
    </Col>
    <Col sm={3}>
      <FormControl type="password" placeholder="Password" />
    </Col>
  </FormGroup>

  <FormGroup>
    <Col smOffset={6} sm={3}>
      <Button type="submit">Create an account</Button>
    </Col>
  </FormGroup>

</Form>

    )
  }
}
 
export default Signup;