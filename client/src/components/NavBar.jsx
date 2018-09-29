import React, { Component } from 'react'
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <Link to="/">Expertize</Link>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <NavItem eventKey={1}>
      Demo
    </NavItem>
    <NavItem eventKey={2}>
      Link
    </NavItem>
  </Nav>
  <Nav pullRight>
      <NavItem eventKey={1}>
        <Link to="/signin">Log In</Link>
      </NavItem>
      <NavItem eventKey={2}>
        <Link to="/signup">Sign Up</Link>
      </NavItem>
    </Nav>
</Navbar>
    );
  }
}
 
export default NavBar;