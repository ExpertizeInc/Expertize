import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={({match}) => (
      rest.authenticated
        ? <Component match={match} user={rest.user} />
        : <Redirect to='/' />
    )} />
)

export default PrivateRoute;