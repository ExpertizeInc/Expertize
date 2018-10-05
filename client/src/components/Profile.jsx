import React, { Component } from 'react';
import { Well, Grid, Col, Row, Panel, PageHeader, Thumbnail, Button, Glyphicon } from 'react-bootstrap'
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

const GET_USER_QUESTIONS = gql`
query questionsByUser($userId: String!) {
  questionsByUser(userId: $userId) {
    title
    description
  }
}
`


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <React.Fragment>
        {this.props.user &&
          <Grid fluid >
            <PageHeader style={{display: 'flex', justifyContent: 'center' }}>Profile</PageHeader>
            <div className="hexagon" style={{ backgroundImage: "url('http://placecorgi.com/150')" }}>
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
            <Col xs={5} md={2} className="centered">
            <Thumbnail className="centered">
              <h2>{this.props.user.username}</h2>
              </Thumbnail>
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
                  {console.log('profile user', this.props.user)}
                  {this.props.user && <h3>{this.props.user.coins}</h3>}
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
            <Query query={GET_USER_QUESTIONS} variables={{userId: this.props.user.id}}>
              {({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>
                return (
                  <React.Fragment>
                    {data.questionsByUser.map((question, i) => (
                    <div>{i+1} Title: {question.title} | Description: {question.description}</div>
                    )
                    )}
                    {console.log('profile questions', data)}
                    </React.Fragment>
                )}}
            </Query>
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
            <Button bsSize="large">
             <Glyphicon glyph="cog" />Edit
            </Button>
              <Mutation mutation={UPDATE_USER} variables={{ id: 'cjmuxt69x46dr0b28449u4jsz', email: 'wssssaaaOOOw@www.com' }}>
                {updateUser => <Link to="/profile">
                  <Button type="submit" onClick={updateUser}>
                    Submit changes
                  </Button>
                </Link>}
              </Mutation>
            </Row>
          </Grid>
        }
      </React.Fragment>
    )
  }
}
 
export default Profile;