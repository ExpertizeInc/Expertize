import React, { Component } from 'react'

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
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
      </div>
    )
  }

}

export default Survey