import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Questions from './loggedInHome/Questions.jsx'

const PrivateRoute = ({ component: Component, ...rest }) => (
  // <Switch>
    <Route {...rest} render={(props) => (
      rest.authenticated
        ? <Component user={rest.user} />
        : <Redirect to='/' />
    )} />
  //   <Route exact strict path="/home/create" render={() => <Questions />}></Route>
  // </Switch>
)

export default PrivateRoute;