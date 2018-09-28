import React, { Component } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Jumbotron>
  <h1>Hello, world!</h1>
  <p>
    This is a simple hero unit, a simple jumbotron-style component for calling
    extra attention to featured content or information.
  </p>
  <p>
    <Button bsStyle="primary">Learn more</Button>
  </p>
</Jumbotron>
    );
  }
}
 
export default Home;