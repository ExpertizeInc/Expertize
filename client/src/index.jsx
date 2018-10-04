import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import Particles from 'react-particles-js';
import params from './particles.js'


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
        {/* <Particles params={params} style={{
          position: 'absolute',
          display: 'block',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/moving-through-stars-in-space_-1zccenlb__F0000.png')"
        }} /> */}
        <Routes authenticated={this.state.authenticated}>   </Routes>
      </ApolloProvider>
    )
  }
}

render(<Router><App/></Router>, document.getElementById('app'));
