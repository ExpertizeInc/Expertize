import React from 'react';
import LIButton from '../LIButton.png';
import { Route, Link } from 'react-router-dom';

export default class LinkedInLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        // this.callbackFunction = this.callbackFunction.bind(this)
        // this.handleClick = this.handleClick.bind(this)
    }

    // componentDidMount() {
    //     var liRoot = document.createElement('div');
    //     liRoot.id = 'linkedin-root';
    //     document.body.appendChild(liRoot);
    //     ((d, s, id) => {
    //         const element = d.getElementsByTagName(s)[0];
    //         const ljs = element;
    //         var js = element;
    //         if (d.getElementById(id)) {
    //             return; }
    //         js = d.createElement(s);
    //         js.id = id;
    //         js.src = '//platform.linkedin.com/in.js';
    //         js.text = 'api_key: 86vkjzfew3pwlx';
    //         ljs.parentNode.insertBefore(js, ljs);
    //     }(document, 'script', 'linkedin-sdk'));
    // }

    // callbackFunction() {
    //     IN.API.Raw("/people/~:(id,firstName,lastName,emailAddress,location,industry)?format=json")
    //     .result((r) => console.log(r))
    //     .error((e) => console.error(e))
    // }

    // handleClick(e) {
    //     e.preventDefault();
    //     window.IN.User.authorize(this.callbackFunction, '');
    //     this.props.signIn()
    // }

    
    render() {
      let { signInLI } = this.props
      return ( 
        <div>
          {console.log(this.props)}
          <button onClick={signInLI}>
          <Link to="/test">
            <img src={LIButton} alt="linkedInButton" style={{ width: 190 }}/>
          </Link>

          </button>
        </div>
      );
    }
};

