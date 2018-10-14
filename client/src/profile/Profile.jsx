import React, { Component } from 'react';
import { Grid, Col, Row, PageHeader, Thumbnail, Label, Glyphicon, Button } from 'react-bootstrap'
import { Mutation, Query } from 'react-apollo';
import { UPDATE_USER_INFO, GET_USER_QUESTIONS, GET_USER_UID } from '../apollo/gql.js';
import Rating from 'react-rating';


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { questions: [] };
    this.completed = this.completed.bind(this);
  }

  completed(questions) {
    this.setState({ questions })
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        {user &&
          <Grid >
            <PageHeader style={{ display: 'flex', justifyContent: 'center' }}>Profile</PageHeader>
            <Row >
              <Col xs={6} md={3} >
                <Thumbnail className="centered">
                  <div className="hexagon" style={{ backgroundImage: `url(${user.image})` }}>
                    <div className="hexTop" />
                    <div className="hexBottom" />
                  </div>
                  <span><h2>{user.username}</h2></span>
                  <Rating readonly initialRating={user.ranking} /> <br />
                  <div>{user.description}</div>
                  <div>{user.tags && user.tags.length > 1 ? user.tags.map(tag => <span><Label className="tags" bsStyle="default">{tag}</Label><div>{'\n'}</div></span>) : <Label className="tags" bsStyle="default">user.tags</Label>}</div>
                
                <Button><Glyphicon glyph="cog" /> Edit preferences</Button>
                </Thumbnail>
              </Col>
              <Col xs={18} md={9}>
                <Row>
                  <Col xs={6} md={4}>
                    <Thumbnail className="centered">
                      <h3>12</h3>
                      Questions answered
                    </Thumbnail>
                  </Col>
                  <Col xs={6} md={4}>
                    <Thumbnail className="centered">
                      <h3>{user.coins}</h3>
                      Coins
                    </Thumbnail>
                  </Col>
                  <Col xs={6} md={4}>
                    <Thumbnail className="centered">
                    <h3>4</h3>
                    Questions asked
                  </Thumbnail>
                  </Col>
                </Row>
                <Row>
                  <Thumbnail className="centered">
                    <h3>Alt stats/graphs</h3>
                    {/* <Query query={GET_USER_QUESTIONS} variables={{ username: user.username }} onCompleted={(data) => console.log(data)}>
                      {({ loading, error, data }) => {
                        if (loading) return <div>Loading...</div>
                        if (error) return <div>Error</div>
                        return (
                          <div>
                            {data.questionsByUser.map((question, i) => <div key={i}>{i + 1} Title: {question.title} | Description: {question.description}</div>)}
                          </div>
                        )
                      }}
                    </Query> */}
                  </Thumbnail>
                  {/* Will show user activity, progress, session history, recently interacted */}
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
              </Col>
            </Row>
          </Grid>
        }
      </div>
    )
  }
};