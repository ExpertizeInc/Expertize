import React, { Component } from 'react';
import linkedInButton from '../../dist/images/LIButton.png';

const LinkedInLogin = ({ linkedInSignIn, signInType }) => {
  if (signInType === 'signIn') {
    return (
      <div>
        <a href="/auth/linkedin"><img style={{width: "50%"}}src={linkedInButton} 
        onClick={(e) => {
          {sessionStorage.setItem('fbOrLi', 'linkedIn')};
          {sessionStorage.setItem('loginType', 'signIn')}
          linkedInSignIn(e)
        }}/></a>
      </div>
    )
  } else {
    return (
      <div>
        <a href="/auth/linkedin"><img src={linkedInButton} 
        onClick={(e) => {
            {sessionStorage.setItem('fbOrLi', 'linkedIn')};
            {sessionStorage.setItem('loginType', 'signUp')}
            linkedInSignIn(e)
        }}/></a>
      </div>
    )
  }
}

export default LinkedInLogin;