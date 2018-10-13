import React from 'react';
import linkedInButton from '../images/LIButton.png';

export default class LinkedInLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
      return ( 
        <a href="/auth/linkedin"><img src={linkedInButton} /></a>
      );
    }
};

