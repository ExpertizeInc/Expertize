import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes.jsx';

const client = new ApolloClient({
  uri: "http://localhost:4000"
});


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false
    }
    this.callbackFunction = this.callbackFunction.bind(this)
    this.signInLI = this.signInLI.bind(this)
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true
        }, () => console.log(user))
      } else {
        this.setState({
          authenticated: false
        })
      }
    })
  }

  callbackFunction() {
    IN.API.Raw("/people/~:(id,firstName,lastName,emailAddress,location,industry)?format=json")
    .result((r) => this.setState({authenticated: true}, console.log(r)))
    .error((e) => console.log(e))
  }

  signInLI(e) {
      e.preventDefault();
      console.log('LINKED IN FKKKKKK')
      window.IN.User.authorize(this.callbackFunction, '')
  }

  // toggleAuthenticated() {
  //   this.setState({
  //     authenticated: !this.state.authenticated
  //   }, () => console.log('toggled authenticated'))
  // }

  render() {
    return (
      <ApolloProvider client={client}>
          <Routes authenticated={this.state.authenticated} signInLI={this.signInLI}/>
      </ApolloProvider>
    )
  }
}

render(<Router><App/></Router>, document.getElementById('app'));
