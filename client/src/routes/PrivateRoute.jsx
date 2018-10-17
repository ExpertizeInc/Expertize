import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Query } from "react-apollo";
import { GET_USER_UID } from '../apollo/gql.js';

const PrivateRoute = ({ component: Component, ...prop, client }) => {


  return (
    <div>{prop.user && 
  <Query query={GET_USER_UID} variables={{ uid: prop.user.uid }}>
{({loading, error, data}) => {
if(loading) return <div>LOADING</div>
if(error) return <div>ERROR</div>


return(
    <Route {...prop} render={({ match }) => (
      prop.authenticated
        ? <Component match={match} client={client} user={data.user} />
        : <Redirect to='/' />
    )} />
)





  }}
  </Query>
}
</div>
)
}

export default PrivateRoute;