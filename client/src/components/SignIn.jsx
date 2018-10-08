// import React from 'react'
// import LinkedinLogin from './LinkedinLogin.jsx'

// const SignIn = ({ signIn }) => {

//     return (
//     <div>
//         <h1>Sign In Page</h1>
//         <div>hello</div>
//         <LinkedinLogin text="SIGN IN" signIn={signIn}/>
//     </div>
//     )
// }



import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel } from 'react-bootstrap';
import LinkedinLogin from './LinkedinLogin.jsx';

export default class Signin extends Component {
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

  submitSignIn(e) {
    //send to firebase/server
    e.preventDefault()
    console.log('submitting sign in to firebase')
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.props.history.push('/home'))
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.error('error code:',errorCode, 'with message: ', errorMessage)
      window.alert('incorrect username/password')
    });
  }

  render() {
    let { signInLI } = this.props
    return (
      <div>
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
        <LinkedinLogin signInLI={(e) => {signInLI(e)}} text="LINKEDIN SIGNIN"/>
      </div>
    );
  }
};