import React, { Component } from 'react'
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.signOutUser = this.signOutUser.bind(this)
  }

  // //for signout button
  signOutUser() {
    let { signOut } = this.props
    if(IN.User.isAuthorized()) {
      IN.User.logout(signOut,'')
    } else {
      firebase.auth().signOut()
    }
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
          <NavItem eventKey={1}>Demo</NavItem>
          {/* for quick access to components during development. */}
          <NavItem eventKey={2}>
            <Link to="/questionaire">Questionaire</Link>
          </NavItem>
          <NavItem eventKey={3}>
            <Link to="/profile">Profile</Link>
          </NavItem>
          <NavItem eventKey={4}>
            <Link to="/chat">Chat</Link>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1}>
            <Link to="/signin">Sign In</Link>
          </NavItem>
          <NavItem eventKey={2}>
            {this.props.authenticated ? <Link to="/" onClick={this.signOutUser}>Sign Out</Link> : <Link to="/signup">Sign Up</Link>}
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
 
export default NavBar;