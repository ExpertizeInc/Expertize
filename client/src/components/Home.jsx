import React, { Component } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import { Query } from 'react-apollo';
import gql from "graphql-tag";

const user = gql`
{
  user(id:1) {
    username
  }
}
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
        <div>
            <Jumbotron>
                <h1>Hello, world!</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
                <p>
                    <Button bsStyle="primary">Learn more</Button>
                </p>
            </Jumbotron>
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
        </div>
    );
  }
}
 
export default Home;
