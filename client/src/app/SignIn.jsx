import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel, Row } from 'react-bootstrap';
import LinkedInLogin from './LinkedInLogin.jsx';

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e, type) {
    e.preventDefault();
    this.setState({ [type]: e.target.value });
  }

  render() {
    return (
      <div>
        <Form className="form-panel-signup" horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={5}>
              Email
            </Col>
            <Col sm={3}>
              <FormControl
                onChange={e => this.onChange(e, 'email')}
                type="email"
                placeholder="Email"
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={5}>
              Password
            </Col>
            <Col sm={3}>
              <FormControl
                onChange={e => this.onChange(e, 'password')}
                type="password"
                placeholder="Password"
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col smOffset={6} sm={3}>
                <Button onClick={(e) => this.props.fbSignIn(e, this.state.email, this.state.password)} type="submit">Log In</Button>
                <br/><LinkedInLogin authenticateLinkedInUser={this.props.authenticateLinkedInUser}/>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
