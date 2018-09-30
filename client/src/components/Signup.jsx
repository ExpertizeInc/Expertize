import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel } from 'react-bootstrap'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    }
    this.onChange = this.onChange.bind(this)
    this.submitSignUp = this.submitSignUp.bind(this)
  }

  onChange(e, type) {
    e.preventDefault()
    this.setState({
      [type]: e.target.value
    })
  }

  submitSignUp() {
    // send to server
    console.log(this.state)
  }

  render() { 
    return (

<Form className="form-panel-signup" horizontal>

  <FormGroup controlId="formHorizontalUsername">
    <Col componentClass={ControlLabel} sm={5}>
      Username
    </Col>
    <Col sm={3}>
      <FormControl value={this.state.username} onChange={(e) => this.onChange(e, 'username')} type="username" placeholder="Username" />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalEmail">
    <Col componentClass={ControlLabel} sm={5}>
      Email
    </Col>
    <Col sm={3}>
      <FormControl value={this.state.email} onChange={(e) => this.onChange(e, 'email')} type="email" placeholder="Email" />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalPassword">
    <Col componentClass={ControlLabel} sm={5}>
      Password
    </Col>
    <Col sm={3}>
      <FormControl password={this.state.password} onChange={(e) => this.onChange(e, 'password')} type="password" placeholder="Password" />
    </Col>
  </FormGroup>

  <FormGroup>
    <Col smOffset={6} sm={3}>
    {/* todo: hook up to firebase/linkedin Oauth */}
      <Button onClick={this.submitSignUp} type="submit">Create an account</Button>
    </Col>
  </FormGroup>

</Form>

    )
  }
}
 
export default Signup;