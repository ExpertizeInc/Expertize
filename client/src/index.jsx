import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from "graphql-tag";

import Routes from './Routes.jsx';

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Routes/>
      </ApolloProvider>
      // <Routes/>
    )
  }
}

render(<App/>, document.getElementById('app'));
