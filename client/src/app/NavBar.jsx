import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.signOutUser = this.signOutUser.bind(this);
  }

  // for signout button
  signOutUser() {
    if (IN.User.isAuthorized()) {
      IN.User.logout(this.props.signOut, '');
    } else {
      firebase.auth().signOut();
    }
  }

  render() {
    const routes = ['Questionnaire', 'Profile'];
    const { authenticated } = this.props;
    return (
      <Navbar >
        <Nav>
          <NavItem eventKey={1} componentClass='span' className="nav-item">
            <Link to="/">Expertize</Link>
          </NavItem>
        </Nav>
        <Nav pullRight>
          {authenticated
            ?
            routes.map(route => (
              <NavItem eventKey={2} key={route} componentClass='span' className="nav-item">
                <Link to={`/${route.toLowerCase()}`}>{route}</Link>
              </NavItem>
            ))
            : null}
          <NavItem eventKey={1} componentClass='span' className="nav-item">
            <Link to="/home/inbox"><Glyphicon glyph="envelope" /> Inbox</Link>
          </NavItem>
          <NavItem eventKey={2} componentClass='span' className="nav-item">
            {!authenticated && <Link to="/signin">Sign In </Link>}
          </NavItem>
          <NavItem eventKey={3} componentClass='span' className="nav-item">
            {authenticated ? <Link to="/" onClick={this.signOutUser}>Sign Out</Link> : <Link to="/signup">Sign Up</Link>}
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
};