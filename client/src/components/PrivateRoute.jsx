import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      rest.authenticated
        ? <Component user={rest.user} />
        : <Redirect to='/' />
    )} />
)

export default PrivateRoute;