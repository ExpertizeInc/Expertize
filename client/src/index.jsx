import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "localhost:3000/graphql"
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
      Hello World!!
      </ApolloProvider>
    )
  }
}

render(<App/>, document.getElementById('app'));
