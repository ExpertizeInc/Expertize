import React from 'react'
import LinkedinLogin from './LinkedinLogin.jsx'

const SignIn = ({ signIn }) => {

    return (
    <div>
        <h1>Sign In Page</h1>
        <div>hello</div>
        <LinkedinLogin text="SIGN IN" signIn={signIn}/>
    </div>
    )
}

export default SignIn