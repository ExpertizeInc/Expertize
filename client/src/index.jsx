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


render(<Router history={history}><App client={client} /></Router>, document.getElementById('app'));
