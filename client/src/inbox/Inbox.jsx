import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_ALL_MESSAGES } from '../apollo/gql.js'
import { Tab, Row, Col, Nav, NavItem, Grid } from 'react-bootstrap';


export default class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() { 
    return (
    
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row className="clearfix">
    <Col sm={4}>
      <Nav bsStyle="pills" stacked>
        <NavItem eventKey="first">Inbox</NavItem>
        <NavItem eventKey="second">Recieved</NavItem>
        <NavItem eventKey="third">Sent</NavItem>
      </Nav>
    </Col>
    <Col sm={8}>
      <Tab.Content animation>
        <Tab.Pane eventKey="first">Tab 1 content</Tab.Pane>
        <Tab.Pane eventKey="second">Tab 2 content</Tab.Pane>
        <Tab.Pane eventKey="third">Tab 2 content</Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>

    );
  }
}
 
