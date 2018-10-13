import React from 'react';
import LIButton from '../LIButton.png';
import { CREATE_USER } from '../gql.js';

export default class LinkedInLogin extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <br />
        <a href="/auth/linkedin" id="signup">
          <img src={LIButton} style={{ width: 190 }} />
        </a>
      </div>
    );
  }
}
