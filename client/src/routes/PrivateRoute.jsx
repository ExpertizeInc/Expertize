import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...prop, client }) => (
    <Route {...prop} render={({match}) => (
      prop.authenticated
        ? <Component match={match} client={client} user={prop.user} />
        : <Redirect to='/' />
    )} />
)

export default PrivateRoute;