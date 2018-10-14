import React, { Component } from 'react';
import linkedInButton from '../../dist/images/LIButton.png';

export default class LinkedInLogin extends Component {
    constructor(props) {
        super(props)
    }
    render() {
      return ( 
        <a href="/auth/linkedin"><img src={linkedInButton} /></a>
      );
    }
};

