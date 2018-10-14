import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...prop }) => (
    <Route {...prop} render={({match}) => (
      prop.authenticated
        ? <Component match={match} user={prop.user} />
        : <Redirect to='/' />
    )} />
)

export default PrivateRoute;