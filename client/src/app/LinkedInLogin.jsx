import React, { Component } from 'react';
import linkedInButton from '../../dist/images/LIButton.png';

const LinkedInLogin = ({ authenticateLinkedInUser, signInType }) => {
  if (signInType === 'signIn') {
    return (
      <div>
        <a href="/auth/linkedin"><img src={linkedInButton} onClick={(e) => {
          {localStorage.setItem('fbOrLi', 'linkedIn')};
          {localStorage.setItem('linkedInLoginType', 'signIn')}
          authenticateLinkedInUser(e)
        }}/></a>
      </div>
    )
  } else {
    return (
      <div>
        <a href="/auth/linkedin"><img src={linkedInButton} onClick={(e) => {
            {localStorage.setItem('fbOrLi', 'linkedIn')};
            {localStorage.setItem('linkedInLoginType', 'signUp')}
            authenticateLinkedInUser(e)
        }}/></a>
      </div>
    )
  }
}

export default LinkedInLogin;