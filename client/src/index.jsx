import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-router-dom';
import Particles from 'react-particles-js';
import params from './particles.js'
import { GET_USER_UID } from './gql.js';
import Routes from './Routes.jsx';
import history from './components/history.js';
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import { split } from 'apollo-client-preset';

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

// const wsLink = new WebSocketLink({

//   uri: 'wss://subscriptions.ap-northeast-1.graph.cool/v1/cjn09bd5a1jca01811za7358n',
//   options: {
//     reconnect: true
//   }
// })

// const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjn09bd5a1jca01811za7358n'})

// const link = split(

//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query)
//     return kind === 'OperationDefinition' && operation === 'subscription'
//   },
//   wsLink,
//   httpLink,
// )

// const client = new ApolloClient({
  
//   link, cache: new InMemoryCache()
// })

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { user: null, authenticated: false }
    this.callbackFunction = this.callbackFunction.bind(this)
    this.signInLI = this.signInLI.bind(this)
    this.signOut = this.signOut.bind(this)
    this.signIn = this.signIn.bind(this)
  }
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        client.query({ query: GET_USER_UID, variables: { uid: user.uid } })
          .then(({ data }) => this.setState({ authenticated: true, user: data.user }))
          .catch(err => console.error('auth faied', err));
      } else {
        this.setState({ authenticated: false });
      }
    })
    // IN.Event.on(IN, 'auth', () => this.setState({authenticated:true}, () => console.log('detected user login',IN.User)), this)
    // IN.Event.on(IN, 'logout', () => this.setState({authorization:false}, () => console.log('logged out')), this)
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
    this.setState({ authenticated: true, user }, () => history.push('/home'));
  }

  callbackFunction() {
    IN.API.Raw("/people/~:(id,firstName,lastName,emailAddress,location,industry)?format=json")
    // this.setState({authenticated: true}, 
    .result((results) => console.log('results in linkedIn', results))
    .error((error) => console.error('error in linkedIn', error));
    IN.API.Raw('/industries?format=json')
    .result((results) => console.log('results in.api.raw', results))
    .error((error) => console.error('error in in.api.raw', error));
  }

  signInLI(e, a) {
      e.preventDefault();
      console.log('LINKED IN');
      IN.User.authorize(this.callbackFunction, '');
      // a.history.push('/restricted')
  }

  signOut() {
    this.setState({ authenticated: false }, () => console.log('toggled authenticated'));
  }

  render() {
    const { user, authenticated } = this.state;
    return (
      <div>
       <ApolloProvider client={client}>
        {/* <Particles params={params} style={{
          position: 'absolute',
          display: 'block',
          zIndex: -10,
          // top: 0,
          // left: 0,
          // right: 0,
          // bottom: 0,
          backgroundImage: "url('http://www.sompaisoscatalans.cat/simage/96/965205/black-gradient-wallpaper.png')"
          // backgroundImage: "url('https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/moving-through-stars-in-space_-1zccenlb__F0000.png')"
        }} /> */}
        <Routes user={user} signIn={this.signIn} authenticated={authenticated} signInLI={this.signInLI} signOut={this.signOut}/>
        </ApolloProvider>
      </div>
    )
  }
}

render(<Router history={history}><App/></Router>, document.getElementById('app'));
