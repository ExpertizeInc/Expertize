import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  // <Switch>
    <Route {...rest} render={({match}) => (
      rest.authenticated
        ? <Component match={match} user={rest.user} />
        : <Redirect to='/' />
    )} />
  //   <Route exact strict path="/home/create" render={() => <Questions />}></Route>
  // </Switch>
)

export default PrivateRoute;