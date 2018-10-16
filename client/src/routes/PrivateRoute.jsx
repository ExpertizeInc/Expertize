import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...prop, client, history }) => (
    <Route {...prop} render={({match}) => (
      prop.authenticated
        ? <Component match={match} client={client} user={prop.user} history={history}/>
        : <Redirect to='/' />
    )} />
)

export default PrivateRoute;