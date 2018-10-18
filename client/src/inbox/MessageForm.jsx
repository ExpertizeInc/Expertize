import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { CREATE_MESSAGE, GET_ALL_MESSAGES } from '../apollo/gql.js'
import { Form, FormGroup, Row, Col, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      message: '',
      recipient: ''
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(e, type) {
    e.preventDefault();
    this.setState({
      [type]: e.target.value
    });
  }

  render() { 
    let { title, message, recipient } = this.state
    let { user } = this.props
    return (
      <Form>
        <FormGroup>
          <div>To<FormControl onChange={(e) => this.onChange(e, 'recipient')} value={this.state.recipient} type="text" /></div>
          <div>Subject<FormControl onChange={(e) => this.onChange(e, 'title')} value={this.state.title} type="text" /></div>
          <div>Message<FormControl onChange={(e) => this.onChange(e, 'message')} value={this.state.message} type="text" /></div>
          <Mutation
            mutation={ CREATE_MESSAGE }
            variables={{ title, message, recipient: { connect: { username: recipient } }, sender: { connect: { username: user.username } } }}
            refetchQueries={() => [{ query: GET_ALL_MESSAGES, variables: { username: user.username } }, { query: GET_USER_UID, variables: { uid: user.uid } }]}
            onComplete={(data) => this.setState({ title: '', message: '', recipient: ''})}>
            {createMessage => {
              return (
                <Row>
                <Col xsOffset={3} sm={3}>
                <Link to="/home/inbox">
                  <Button className="btn-2g bttn" onClick={createMessage}>Send</Button>
                </Link></Col></Row>
              );
            }}
        </Mutation>
        </FormGroup>
      </Form>
    );
  }
}
 
export default MessageForm;