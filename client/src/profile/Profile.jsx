import React, { Component } from 'react';
import { Grid, Col, Row, PageHeader, Thumbnail, Label, Glyphicon, Button } from 'react-bootstrap'
import { Mutation, Query } from 'react-apollo';
import { GET_USER_QUESTIONS, GET_ALL_FINISHED_SESSIONS } from '../apollo/gql.js';
import Rating from 'react-rating';


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { questions: [], asked: 'Loading...' };
    this.completed = this.completed.bind(this);
  }

  completed(questions) {
    this.setState({ questions });
  }

  render() {
    const { user } = this.props;
    console.log('profileeeeee', user)
    return (
      <div>
        <Query query={GET_ALL_FINISHED_SESSIONS} variables={{id: user.id }} onCompleted={(data) => console.log('data from querying session for all', data)}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error</div>
            if (true) console.log('data from get all finished sessions', data)
            console.log('user ranking', user.ranking / (data.getAllFinishedSessions.filter(x => x.expert.username === user.username).length))
            return (
              // <Grid>
              <div>
                <Row >
                  <Col md={12}>
                    <Row>
                      <Col xs={6} md={4}>
                        <Thumbnail className="centered">
                          <h3>{data.getAllFinishedSessions.filter(x => x.expert.username === user.username).length}</h3>
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
                        <h3>{user.questionsAsked.length}</h3>
                        Questions asked
                      </Thumbnail>
                      </Col>
                    </Row>

                    <Row>
                      <Thumbnail className="centered">
                        <h3>Alt stats/graphs</h3>
                      <Rating readonly initialRating={data.getAllFinishedSessions.filter(x => x.expert.username === user.username).length === 0 ? 0 : user.ranking / (data.getAllFinishedSessions.filter(x => x.expert.username === user.username).length)  } /> <br />
                        <Query query={GET_USER_QUESTIONS} variables={{ username: user.username }} onCompleted={(data) => console.log(data)}>
                          {({ loading, error, data }) => {
                            if (loading) return <div>Loading...</div>
                            if (error) return <div>Error</div>
                            return (
                              <div>
                                {console.log('aaaaaaaaaa',data)}
                                {data.questionsByUser.map((question, i) => <div key={i}>{i + 1} Title: {question.title} | Description: {question.description}</div>)}
                              </div>
                            )
                          }}
                        </Query>
                      </Thumbnail>
                    </Row>

                    <Row>
                      <Col>
                        <Thumbnail className="centered">
                          <h3>Interaction History, etc</h3>
                            <div>
                              {data.getAllFinishedSessions.length > 0 ? data.getAllFinishedSessions.map((session, i) => 
                              <div key={i}>{user.username === session.expert.username ? `You helped ${session.pupil.username} | +${session.question.coins} coins` : 
                                `${session.expert.username} helped you | -${session.question.coins} coins`}</div>) :
                                <div>Uh Oh, no sessions</div>
                              }
                            </div>
                        </Thumbnail>
                      </Col>
                    </Row>

                  </Col>

                </Row>
                </div>
              // </Grid>
            )
          }}
        </Query>
      </div>
    )
  }
}