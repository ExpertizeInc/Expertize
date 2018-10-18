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
        <FormGroup>
          <Row>
          <Col smOffset={4} sm={3}>
            <div>
              {signUpLinkedIn
              ?
              <div>
                <br/><LinkedInLogin linkedInSignIn={linkedInSignIn} signInType="signUp"/>
                <h5>Don't have a LinkedIn account? <Button placeholder="Click Here"onClick={() => this.setState({ signUpLinkedIn: !signUpLinkedIn })}>Click Here</Button></h5>
              </div>
              :
              ''
              }
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
                      onClick={this.submitSignUp} 
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
          </Col>
          </Row>
        </FormGroup>
     
    )
  }
};