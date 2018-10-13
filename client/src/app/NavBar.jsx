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

  // for signout button
  signOutUser() {
    console.log(this.props)
    if (this.props.user.id.length < 28) {
         // check if linkedIn user
      // if so, get request to logout
      axios.get('/logout')
      .then(() => {
        window.location.href = "/";
      })
      .catch(e => console.error)
    } else {
      firebase.auth().signOut();
      this.props.signOut()
    }
  }

  render() {
    const routes = ['Questionnaire', 'Profile', 'Chat', 'Video'];
    const { authenticated } = this.props;
    return (
      <Navbar fluid >
        <Nav>
          <NavItem componentClass='span' className="cl-effect-1" style={{ marginTop: 15 }}>
            <Link to="/">Expertize</Link>
          </NavItem>
        </Nav>
        <Nav>
          <NavItem eventKey={1} componentClass='span' className="cl-effect-1" style={{ marginTop: 15 }}><Link to="/">Demo</Link></NavItem>
          {/* for quick access to components during development. */}
          {authenticated
            ? 
            routes.map(route => (
              <NavItem eventKey={2} key={route} className="cl-effect-1" componentClass='span' style={{ marginTop: 15 }}>
                <Link to={`/${route.toLowerCase()}`}>{route}</Link> &nbsp; &nbsp;
              </NavItem> 
              ))
            : null}
          <NavItem eventKey={1} className="cl-effect-1" componentClass='span' style={{ marginTop: 15 }}>
            <Link to="/signin"><Glyphicon glyph="envelope" /> Inbox</Link> &nbsp; &nbsp;
          </NavItem>
        </Nav>

        <Nav pullRight>

          <NavItem eventKey={2} className="cl-effect-1" componentClass='span' style={{ marginTop: 15 }}>
            <Link to="/signin">Sign In </Link> &nbsp; &nbsp;
          </NavItem>
          <NavItem eventKey={3} className="cl-effect-1" componentClass='span' style={{ marginTop: 15, marginRight: 15 }}>
            {authenticated ? <Link to="/" onClick={this.signOutUser}>Sign Out</Link> : <Link to="/signup">Sign Up</Link>}
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
};