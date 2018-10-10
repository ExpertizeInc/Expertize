import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { Router } from 'react-router-dom';
import history from './components/history.js';
import App from './components/App.jsx';
import { HttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'


const client = new ApolloClient({
  uri: "http://localhost:4000"
  // link,
  // cache
});

// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:4000',
//   options: {
//     reconnect: true
//   }
// })

// const httpLink = new HttpLink({ uri: 'http://localhost:4000'})

// const link = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query)
//     return kind === 'OperationDefinition' && operation === 'subscription'
//   },
//   wsLink,
//   httpLink
// )

// const client = new ApolloClient({ 
//   link
//   // cache: new InMemoryCache()
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
// })
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
        {/* <Subscription></Subscription> */}
        </ApolloProvider>
      </div>
    )
  }
}

render(<Router history={history}><App client={client} /></Router>, document.getElementById('app'));
