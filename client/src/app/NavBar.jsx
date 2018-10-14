import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.signOutUser = this.signOutUser.bind(this);
  }

  componentDidMount() {
    // this.props.authenticateLinkedInUser();
  }

  // for signout button
  signOutUser() {
    console.log(this.props)
    if (this.props.user.id.length < 20) {
      // check if linkedIn user if so, get request to logout
      axios.get('/logout')
      .then(() => this.props.history.push('/'))
      .catch(err => console.error('err in logout', err))
    } else {
      firebase.auth().signOut();
      this.props.signOut();
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