import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel, Row, Panel, Grid } from 'react-bootstrap';
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
    const { fbSignIn, linkedInSignIn } = this.props;
    return (
      <Grid style={{ marginTop: 150 }}>
        <Col md={4}>
        </Col>
        <Col style={{ backgroundColor: "#000", opacity: .95, borderRadius: 15, padding: 30 }} md={4}>
          <Row className="center"><h3>Sign In</h3></Row>
          <Form className="form-panel-signup" horizontal>
            <Row >
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} md={3}>
                  Email
                </Col>
                <Col md={9}>
                  <FormControl className="white"
                    onChange={e => this.onChange(e, 'email')}
                    type="email"
                  />
                </Col>
              </FormGroup>
            </Row>
            <Row>
              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} md={3}>
                  Password
            </Col>
                <Col md={9}>
                  <FormControl className="white"
                    onChange={e => this.onChange(e, 'password')}
                    type="password"/>
                </Col>
              </FormGroup>
            </Row>
            <Row className="center">
              <FormGroup>
                <Col >
                  <Button className="white btn-2g bttn" onClick={(e) => {
                    localStorage.setItem('fbOrLi', 'firebase');
                    fbSignIn(e, this.state.email, this.state.password);
                  }}
                    type="submit">Submit</Button>
                </Col>
              </FormGroup>
            </Row>
            <Row className="center" style={{ marginBottom: 20 }}>- OR -
            </Row>
            <Row className="center">
              <LinkedInLogin linkedInSignIn={linkedInSignIn} signInType="signIn" />
            </Row>
          </Form>
        </Col>
        <Col md={4}>
        </Col>
      </Grid>
    );
  }
}
