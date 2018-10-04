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
      user: null,
      authenticated: false
    }
    this.callbackFunction = this.callbackFunction.bind(this)
    this.signInLI = this.signInLI.bind(this)
    this.signOut = this.signOut.bind(this)
    this.signIn = this.signIn.bind(this)
  }
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.setState({
          authenticated: true
        }, () => console.log('authenticated'))
      } else {
        this.setState({
          authenticated: false
        })
      }
    })
    
    IN.Event.on(IN, 'auth', () => this.setState({authenticated:true}, () => console.log('detected user login',IN.User)), this)
    IN.Event.on(IN, 'logout', () => this.setState({authorization:false}, () => console.log('logged out')), this)
    // if (IN.User.isAuthorized()) {
    //   console.log('in.user',IN.User.isAuthorized())
    //   this.setState({
    //     authenticated: true
    //   }, () => console.log('li user is logged in'))
    // } else {
    //   console.log('no linkedin user signed in')
    // }
  }

  signIn(user) {
    console.log('signed in:', user)
    this.setState({ user: user })
  }

  callbackFunction() {
    IN.API.Raw("/people/~:(id,firstName,lastName,emailAddress,location,industry)?format=json")
    // this.setState({authenticated: true}, 
    .result((r) => console.log(r))
    .error((e) => console.log(e))
    IN.API.Raw('/industries?format=json')
    .result((r) => console.log(r))
    .error((e) => console.error(e))
    
  }

  signInLI(e, props) {
      e.preventDefault();
      console.log('LINKED IN FKKKKKK')
      IN.User.authorize(this.callbackFunction, '')
      props.push('/restricted')
  }

  signOut() {
    this.setState({
      authenticated: false
    }, () => console.log('toggled authenticated'))
  }

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
        <Routes user={this.state.user} signIn={this.signIn} authenticated={this.state.authenticated} signInLI={this.signInLI} signOut={this.signOut}>   </Routes>
      </ApolloProvider>
    )
  }
}

render(<Router><App/></Router>, document.getElementById('app'));
