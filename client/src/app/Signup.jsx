import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, Row, Button, Panel, ControlLabel, Grid } from 'react-bootstrap'
import LinkedInLogin from './LinkedInLogin.jsx';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      uid: '',
      signUpLinkedIn: true
    }
    this.onChange = this.onChange.bind(this);
    this.submitSignUp = this.submitSignUp.bind(this);
  }

  onChange(e, type) {
    e.preventDefault()
    this.setState({
      [type]: e.target.value
    })
  }

  submitSignUp(e) {
    const { email, password, username } = this.state;
    const { addFirebaseUser } = this.props;
    e.preventDefault();
    localStorage.setItem('fbOrLi', 'firebase');
    localStorage.setItem('loginType', 'signUp');
    addFirebaseUser(e, email, password, username);
  }

  render() { 
    const { username, email, password, signUpLinkedIn } = this.state;
    const { linkedInSignIn } = this.props;
    const formInfo = [{value: username, placeholder: 'Username'}, {value: email, placeholder: 'Email'}, {value: password, placeholder: 'Password'}];
    return (
      <Grid style={{ marginTop: 150 }}>
        <Col md={4}>
        </Col>
        <Col style={{ backgroundColor: "#000", opacity: .9, borderRadius: 15, padding: 30 }} md={4}>
          <Row className="center" style={{ marginBottom: 15}}><h3>Sign Up</h3></Row>
          {signUpLinkedIn &&
            <Form className="form-panel-signup" horizontal>
              <Row className="centered">
              <LinkedInLogin linkedInSignIn={linkedInSignIn} signInType="signUp" />
              </Row>
              <Row style={{ marginTop: 50 }} className="centered">
              <h5>Don't have a LinkedIn account?</h5>
                <Button className="bttn btn-2g" placeholder="Click Here" onClick={() => this.setState({ signUpLinkedIn: !signUpLinkedIn })}>
                Click Here
                </Button>
                </Row>
              
            </Form>
          }
          {!signUpLinkedIn &&
            <Form className="form-panel-signup centered" horizontal>
              {formInfo.map(info => (
                <FormGroup controlId={`formHorizontal${info.placeholder}`} key={info.placeholder}>
                  <Col componentClass={ControlLabel} md={3}>
                    {info.placeholder}
                  </Col>
                  <Col md={9}>
                    <FormControl className="white" value={info.value} onChange={(e) => this.onChange(e, info.placeholder.toLowerCase())} type={info.placeholder.toLowerCase()} />
                  </Col>
                </FormGroup>
              ))}
              <Row className="center">
              <Button className="bttn btn-2g" onClick={this.submitSignUp} type="submit">
                Create An Account
              </Button>
              </Row>
            </Form>
          }
        </Col>
        <Col md={4}>
        </Col>
      </Grid>
    )
  }
};