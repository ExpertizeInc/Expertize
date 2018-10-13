import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel } from 'react-bootstrap'
import { CREATE_USER } from '../apollo/gql.js';
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

  handleClickForLinkedInLogin() {
    this.setState({ })
  }

  submitSignUp(e, cb) {
    const { email, password } = this.state;
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
    const { username, email, password, signUpLinkedIn } = this.state;
    const formInfo = [{value: username, placeholder: 'Username'}, {value: email, placeholder: 'Email'}, {value: password, placeholder: 'Password'}];
    return (
        <FormGroup>
          <Col smOffset={6} sm={3}>
          <Mutation mutation={CREATE_USER} onError={(err) => console.error('Error in createUser mutation', err)} onCompleted={({newUser}) => this.props.signIn(newUser)}>
            {(createUser, { data }) => {
              return (
                <div>
                  {signUpLinkedIn
                  ?
                  <div>
                    <br/><LinkedInLogin />
                    <h5>Don't have a linkedin account? <Button placeholder="Click Here"onClick={() => this.setState({ signUpLinkedIn: !signUpLinkedIn })}>click here</Button></h5>
                  </div>
                  :
                  ''
                  }
                  {!signUpLinkedIn 
                  ? 
                  <Form className="form-panel-signup" horizontal>
                    <Col>
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
                      <Button 
                        onClick={e => this.submitSignUp(e, (uid) => createUser({ variables: { username, email, uid } }))} 
                        type="submit"
                      >
                        Create An Account
                      </Button>
                    </Col>
                  </Form>
                :
                ''
                }
                </div>
              )
            }}
          </Mutation>
          </Col>
        </FormGroup>
     
    )
  }
};