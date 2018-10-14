import React, { Component } from 'react'
import { Mutation } from 'react-apollo';

import { CREATE_MESSAGE } from '../apollo/gql.js'

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      recipient: ''
    }
  }
  render() { 
    return (
      <div>bam</div>
    );
  }
}
 
export default MessageForm;