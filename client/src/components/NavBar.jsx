import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.signOutUser = this.signOutUser.bind(this);
  }

  // //for signout button
  signOutUser() {
    if (IN.User.isAuthorized()) {
      IN.User.logout(this.props.signOut, '');
    } else {
      firebase.auth().signOut();
    }
  }

  render() {
    const routes = ['Questionnaire', 'Profile', 'Chat', 'Video'];
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
          {authenticated
            ? routes.map(route => (
                <NavItem eventKey={2} key={route}>
                  <Link to={`/${route.toLowerCase()}`}>{route}</Link>
                </NavItem>
              ))
            : null}
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
