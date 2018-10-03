import React, { Component } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";

const user = gql`
{
  user(id: "cjmrvyujt000i0a18j92v4gof") {
    username
    email
  }
}
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        authenticated: false
     }
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
            {/* { this.state.authenticated === false ? // REMOVE === false
            // (<div>
            //     <Query query={user}>
            //     {({ loading, error, data }) => {
            //         if (loading) return <div>Fetching</div>
            //         if (error) return <div>Error</div>
            //         return (
            //         <div>
            //             {console.log(data.user.username)}
            //             Hi, {data.user.username}
            //         </div>
            //         )
            //     }}
            // </Query>
            // <div>Hello World!!</div>
            // </div>) : <div>Not Logged In</div>
            // } */}
        </div>
    );
  }
}
 
export default Home;
