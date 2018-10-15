import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Form, FormGroup, FormControl, Col, Row, Button, Panel, ControlLabel } from 'react-bootstrap'
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
      this.setState({ uid: user.uid })
      localStorage.setItem('userId', this.state.uid);
      localStorage.setItem('user', user);
      localStorage.setItem('fbOrLi', 'firebase');
      localStorage.setItem('timestamp', Date.now());
      cb(user.uid);
    }).then(() => this.props.history.push('/questionnaire'))
    .catch((error) => console.error(`errorCode: ${error.code}, errorMessage: ${error.message}`));
  }

  render() { 
    const { username, email, password, signUpLinkedIn } = this.state;
    const formInfo = [{value: username, placeholder: 'Username'}, {value: email, placeholder: 'Email'}, {value: password, placeholder: 'Password'}];
    return (
        <FormGroup>
          <Row>
          <Col smOffset={4} sm={3}>

          <Mutation mutation={CREATE_USER} onError={(err) => console.error('Error in createUser mutation', err)} onCompleted={({newUser}) => this.props.signIn(newUser)}>
            {(createUser, { data }) => {
              return (
                <div>
                  {signUpLinkedIn
                  ?
                  <div>
                    <br/><LinkedInLogin onClick={() => {
                      localStorage.setItem('fbOrLi', 'linkedIn');
                      localStorage.setItem('timestamp', Date.now());
                    }}/>
                    <h5>Don't have a linkedin account? <Button placeholder="Click Here"onClick={() => this.setState({ signUpLinkedIn: !signUpLinkedIn })}>click here</Button></h5>
                  </div>
                  :
                  ''}
                  {!signUpLinkedIn 
                  ? 
                  <Form className="form-panel-signup centered" horizontal>
                            <Panel>
                  
                    {formInfo.map(info => (
                      <FormGroup controlId={`formHorizontal${info.placeholder}`} key={info.placeholder}>
                        <Col componentClass={ControlLabel} sm={5}>
                          {info.placeholder}
                        </Col>
                        <Col sm={8}>
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
                    
                    </Panel>
                  </Form>
                :
                ''
                }
                </div>
              )
            }}
          </Mutation>
          </Col>
          </Row>
        </FormGroup>
     
    )
  }
};