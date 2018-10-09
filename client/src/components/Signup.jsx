import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel } from 'react-bootstrap'
import { createUser } from '../gql.js';

export default class Signup extends Component {
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
    const { uid, email, password } = this.state;
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(({user}) => {
      console.log('created fb user', user)
      this.setState({ uid: user.uid })
      cb(user.uid);
    }).then(() => this.props.history.push('/questionnaire'))
    .catch((error) => console.error(`errorCode: ${error.code}, errorMessage: ${error.message}`));
  }
  render() { 
    const { username, email, password } = this.state;
    const formInfo = [{value: username, placeholder: 'Username'}, {value: email, placeholder: 'Email'}, {value: password, placeholder: 'Password'}];
    return (
      <Form className="form-panel-signup" horizontal>
        {formInfo.map(info => (
          <FormGroup controlId={`formHorizontal${info.placeholder}`} key={info.placeholder}>
            <Col componentClass={ControlLabel} sm={5}>
              {info.placeholder}
            </Col>
            <Col sm={3}>
            <FormControl value={info.value} onChange={(e) => this.onChange(e, info.placeholder.toLowerCase())} type={info.placeholder.toLowerCase()} placeholder={info.placeholder} />
            </Col>
          </FormGroup>
        ))}
        <FormGroup>
          <Col smOffset={6} sm={3}>
          {/* todo: hook up to firebase/linkedin Oauth */}
          <Mutation mutation={createUser} onError={(err) => console.error('Error in createUser mutation', err)} onCompleted={({newUser}) => this.props.signIn(newUser)}>
            {(createUser, { data }) => {
              return (
                <Button 
                  onClick={e => this.submitSignUp(e, (uid) => createUser({ variables: { username, email, uid } }))} 
                  type="submit"
                >
                   Create An Account
                </Button>
              )
            }}
          </Mutation>
          </Col>
        </FormGroup>
      </Form>
    )
  }
};