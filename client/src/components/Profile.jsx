import React, { Component } from 'react';
import { Well, Grid, Col, Row, Panel, PageHeader, Thumbnail, Button } from 'react-bootstrap'
import { Mutation, Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";

const UPDATE_USER = gql`
mutation updateUser($id: String!, $email: String, $uid: String, $description: String, $coins: Int) {
    updateUser(id: $id, email: $email, uid: $uid, description: $description, coins: $coins) {
        id
        description
    }
}
`;



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Grid>
        <PageHeader style={{ display: 'flex', justifyContent: 'center' }}>Profile</PageHeader>
        <div className="hexagon" style={{ backgroundImage: "url('http://placecorgi.com/150')" }}>
          <div className="hexTop"></div>
          <div className="hexBottom"></div>
        </div>
        <Col md={2} className="profile-nav centered">
          <h2>Username</h2>
        </Col>
        <Row >
          {/* user's key stats on app */}
          <Col xs={6} md={3}>
            <Thumbnail className="centered">
              <h3>11</h3>
              Posts
          </Thumbnail>
          </Col>
          <Col xs={6} md={3}>
            <Thumbnail className="centered">
              <h3>23</h3>
              Coins
          </Thumbnail>
          </Col>
          <Col xs={6} md={3}>
            <Thumbnail className="centered">
              <h3>7</h3>
              Fields
            </Thumbnail>
          </Col>
        </Row>
        <Row>
          <Col>
        <Thumbnail className="centered">
              <h3>Alt stats/graphs</h3>
              
          Main body
            </Thumbnail>
          {/* Will show user activity, progress, session history, recently interacted */}
          </Col>
        </Row>
        <Row>
          <Col>
        <Thumbnail className="centered">
              <h3>Interaction History, etc</h3>
              
           Map out session history for user
            </Thumbnail>
          {/* Will show user activity, progress, session history, recently interacted */}
          </Col>
        </Row>
        <Row>
        <Mutation mutation={UPDATE_USER} variables={{ id: 'cjmuxt69x46dr0b28449u4jsz',email:'wssssaaaOOOw@www.com'}}>
                { updateUser => <Link to="/profile">
                  <Button type="submit" onClick={updateUser}>
                    EDIT
                  </Button>
                </Link>}
              </Mutation>
        </Row>
      </Grid>
    )
  }
}
 
export default Profile;