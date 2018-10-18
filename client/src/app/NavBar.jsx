import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const routes = ['Questionnaire'];
    const { authenticated, signOut } = this.props;
    return (
      <Navbar fluid>
        <Nav>
          <NavItem componentClass='span' className="nav-item">
            <Link to="/">Expertize</Link>
          </NavItem>
        </Nav>
        <Nav  pullRight>
          {authenticated
            ?
            routes.map(route => (
              <NavItem  key={route} componentClass='span' className="nav-item">
                <Link to={`/${route.toLowerCase()}`}>{route}</Link>
              </NavItem>
            ))
            : null}
          <NavItem  componentClass='span' className="nav-item">
            <Link to="/aboutus"> About Us</Link>
          </NavItem>
          <NavItem  componentClass='span' className="nav-item">
            <Link to="/faq"> FAQ</Link>
          </NavItem>
          {!authenticated && <NavItem  componentClass='span' className="nav-item">
            <Link to="/signin">Sign In </Link>
          </NavItem>}
          <NavItem componentClass='span' className="nav-item">
            {authenticated ? <Link to="/" onClick={signOut}>Sign Out</Link> : <Link to="/signup">Sign Up</Link>}
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
};