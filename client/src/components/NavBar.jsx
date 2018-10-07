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
    const { authenticated } = this.props;
    return (
    <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Expertize</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1}>Demo</NavItem>
          {/* for quick access to components during development. */}
          {authenticated ? 
            <NavItem eventKey={2}>
              <Link to="/questionaire">Questionaire</Link>
            </NavItem> : null}
            {authenticated ? 
            <NavItem eventKey={2}>
              <Link to="/profile">Profile</Link>
            </NavItem> : null}
            {authenticated ? 
            <NavItem eventKey={2}>
              <Link to="/chat">Chat</Link>
            </NavItem> : null}
            {authenticated ? 
            <NavItem eventKey={2}>
              <Link to="/video">Video</Link>
            </NavItem> : null}
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1}>
            <Link to="/signin">Sign In</Link>
          </NavItem>
          <NavItem eventKey={2}>
            {authenticated ? <Link to="/" onClick={this.signOutUser}>Sign Out</Link> : <Link to="/signup">Sign Up</Link>}
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
 
export default NavBar;