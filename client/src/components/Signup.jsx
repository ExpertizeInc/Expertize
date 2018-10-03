import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Form, FormGroup, FormControl, Col, Button, ControlLabel } from 'react-bootstrap'


const createUser = gql`
mutation CreateUser($username: String! $email: String!, $uid: String!) {
    createUser(username: $username, email: $email, uid: $uid) {
        username
        email
    }
}
`;

// const addLinkedInUser = gql`
//   mutation AddUser($input: String!) {
//     addUser(input: $input) {
//       username
//       email
//     }
//   }
// `;

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
    this.addUser = this.addUser.bind(this);
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
      console.log(user, 'created user with firebase!!')
      this.setState({ uid: user.uid}, () => cb())
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('error code:',errorCode, ': ', errorMessage)
    });
  }

  addUser() {
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
            <Mutation mutation={createUser} fetchPolicy="no-cache" onError={(err) => console.log('ERRRORRRRR', err)} onComplete={(data) => console.log('COMPLETED', data)}>
              {(createUser, { data }) => {
                console.log(data) 
                return (
                 <Button onClick={e => {
                    this.submitSignUp(e, () => {
                      createUser({ variables: { username: this.state.username, email: this.state.email, uid: this.state.uid }})
                    });
                 }} type="submit">Create an account</Button>
                )}}
             
              </Mutation>
            </Col>
          </FormGroup>
        
   
      </Form>


    )
  }
}
 
export default Signup;