import React, { Component } from 'react'
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

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
      <a href="#home">Expertize</a>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <NavItem eventKey={1} href="#">
      Link
    </NavItem>
    <NavItem eventKey={2} href="#">
      Link
    </NavItem>
  </Nav>
  <Nav pullRight>
      <NavItem eventKey={1} href="#">
        Log In
      </NavItem>
      <NavItem eventKey={2} href="#">
        Sign Up
      </NavItem>
    </Nav>
</Navbar>
    );
  }
}
 
export default NavBar;