import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel } from 'react-bootstrap';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email:'',
        password: ''
    }
    this.onChange = this.onChange.bind(this)
    this.submitSignIn = this.submitSignIn.bind(this)
  }

  onChange(e, type) {
    e.preventDefault()
    this.setState({
      [type]: e.target.value
    })
  }

  submitSignIn() {
    //send to firebase/server
    console.log(this.state)
  }

  render() {
    return (
      <Form className="form-panel-signup" horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={5}>
            Email
          </Col>
          <Col sm={3}>
            <FormControl onChange={(e) => this.onChange(e, 'email')} type="email" placeholder="Email" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={5}>
            Password
          </Col>
          <Col sm={3}>
            <FormControl onChange={(e) => this.onChange(e, 'password')} type="password" placeholder="Password" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={6} sm={3}>
            <Button onClick={this.submitSignIn} type="submit">Log In</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default Signin