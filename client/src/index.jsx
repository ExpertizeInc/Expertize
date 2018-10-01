import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes.jsx';

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false
    }
    // this.toggleAuthenticated = this.toggleAuthenticated.bind(this)
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

  // toggleAuthenticated() {
  //   this.setState({
  //     authenticated: !this.state.authenticated
  //   }, () => console.log('toggled authenticated'))
  // }

  render() {
    return (
      <ApolloProvider client={client}>
          <Routes authenticated={this.state.authenticated}/>
      </ApolloProvider>
    )
  }
}

render(<Router><App/></Router>, document.getElementById('app'));
