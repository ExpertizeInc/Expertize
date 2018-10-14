import React, { Component } from 'react';
import linkedInButton from '../../dist/images/LIButton.png';

const LinkedInLogin = ({ authenticateLinkedInUser }) => <a href="/auth/linkedin"><img src={linkedInButton} onClick={authenticateLinkedInUser}/></a>;

export default LinkedInLogin;