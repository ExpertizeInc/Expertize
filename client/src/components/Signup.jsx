import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel } from 'react-bootstrap'
import { createUser } from '../gql.js';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      uid: ''
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

  submitSignUp(e, cb) {
    // send to server
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(({user}) => {
      console.log('created fb user')
      this.setState({ uid: user.uid}, () => cb())
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('error code:',errorCode, ': ', errorMessage)
    });
  }




  render() { 
    const { username, email, password, uid } = this.state;
    return (
 
        <Form className="form-panel-signup" horizontal>
          <FormGroup controlId="formHorizontalUsername">
            <Col componentClass={ControlLabel} sm={5}>
              Username
            </Col>
            <Col sm={3}>
              <FormControl value={username} onChange={(e) => this.onChange(e, 'username')} type="username" placeholder="Username" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={5}>
              Email
            </Col>
            <Col sm={3}>
              <FormControl value={email} onChange={(e) => this.onChange(e, 'email')} type="email" placeholder="Email" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={5}>
              Password
            </Col>
            <Col sm={3}>
              <FormControl password={password} onChange={(e) => this.onChange(e, 'password')} type="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={6} sm={3}>
            {/* todo: hook up to firebase/linkedin Oauth */}
            <Mutation mutation={createUser} fetchPolicy="no-cache" onError={(err) => console.log('ERRRORRRRR', err)} onCompleted={({createUser}) => this.props.signIn(createUser)}>
              {(createUser, { data }) => {
                return (
                  <Button onClick={e => {
                    this.submitSignUp(e, () => {
                      createUser({ variables: { username, email, uid } })
                    });
                  }} type="submit">
                    Create an account
                 </Button>
                )
              }}

            </Mutation>
            </Col>
          </FormGroup>
        
   
      </Form>


    )
  }
}
 
export default Signup;