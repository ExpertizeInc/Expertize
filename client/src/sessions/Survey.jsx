import React, { Component } from 'react'
import { UPDATE_USER_INFO } from '../apollo/gql.js'

class Survey extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>rate your Expert!</h1>
        <form>
        </form>
      </div>
    )
  }

}

export default Survey