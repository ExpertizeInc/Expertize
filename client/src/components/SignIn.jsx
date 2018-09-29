import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel } from 'react-bootstrap';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email:'',
        password: ''
    }
  }
  render() {
    return (
<Form className="form-panel-signup" horizontal>

<FormGroup controlId="formHorizontalEmail">
  <Col componentClass={ControlLabel} sm={5}>
    Email
  </Col>
  <Col sm={3}>
    <FormControl type="email" placeholder="Email" />
  </Col>
</FormGroup>

<FormGroup controlId="formHorizontalPassword">
  <Col componentClass={ControlLabel} sm={5}>
    Password
  </Col>
  <Col sm={3}>
    <FormControl type="password" placeholder="Password" />
  </Col>
</FormGroup>

<FormGroup>
  <Col smOffset={6} sm={3}>
    <Button type="submit">Log In</Button>
  </Col>
</FormGroup>

</Form>
    );
  }
}

export default Signin