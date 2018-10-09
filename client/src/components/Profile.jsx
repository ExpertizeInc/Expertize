import React, { Component } from 'react';
import { Grid, Col, Row, PageHeader, Thumbnail } from 'react-bootstrap'
import { Mutation, Query } from 'react-apollo';
import { UPDATE_USER, GET_USER_QUESTIONS } from '../gql.js';


export default class Profile extends Component {
  render() {
    const { user } = this.props;
    const userInfo = [{name: 'Posts', info: '3'}, {name: 'Coins', info: user ? user.coins : '' }, {name: 'Fields', info: '7'}];
    return (
      <div>
        {user &&
          <Grid fluid >
            <PageHeader style={{display: 'flex', justifyContent: 'center' }}>Profile</PageHeader>
            <div className="hexagon" style={{ backgroundImage: "url('http://placecorgi.com/150')" }}>
              <div className="hexTop" />
              <div className="hexBottom"/>
            </div>
            <Col xs={6} md={2} className="centered">
            <Thumbnail className="centered">
              <h2>{user.username}</h2>
              </Thumbnail>
            </Col>
            <Row >
              {userInfo.map(user => (
                <Col xs={6} md={3} key={user.name}>
                  <Thumbnail className="centered">
                    <h3>{user.info}</h3>
                    {user.name}
                  </Thumbnail>
                </Col>
              ))}
            </Row>
            <Row>
              <Col>
                <Thumbnail className="centered">
                  <h3>Alt stats/graphs</h3>
                  <Query query={GET_USER_QUESTIONS} variables={{ userId: user.id }}>
                    {({ loading, error, data }) => {
                      if (loading) return <div>Loading...</div>
                      if (error) return <div>Error</div>
                      return (
                        <React.Fragment>
                          {data.questionsByUser.map((question, i) => <div key={i}>{i+1} Title: {question.title} | Description: {question.description}</div>)}
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
            {/* <Button bsSize="large">
             <Glyphicon glyph="cog" />Edit
            </Button>
              <Mutation mutation={UPDATE_USER} variables={{ id: 'cjmuxt69x46dr0b28449u4jsz', email: 'wssssaaaOOOw@www.com' }}>
                {updateUser => <Link to="/profile">
                  <Button type="submit" onClick={updateUser}>
                    Submit changes
                  </Button>
                </Link>}
              </Mutation> */}
            </Row>
          </Grid>
        }
      </div>
    )
  }
};