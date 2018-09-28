import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from "graphql-tag";


const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

const user = gql`
{
  user(id:1) {
    username
  }
}
`;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={user}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>
            return (
              <div>
                Hi, {data.user.username}.
            </div>
            )
          }}
        </Query>
        <div>Hello World!!</div>
      </ApolloProvider>
    )
  }
}

render(<App/>, document.getElementById('app'));
