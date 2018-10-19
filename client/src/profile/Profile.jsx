import React, { Component } from 'react';
import { Grid, Col, Row, PageHeader, Thumbnail, Image, Panel } from 'react-bootstrap'
import { Mutation, Query } from 'react-apollo';
import { GET_USER_QUESTIONS, GET_ALL_FINISHED_SESSIONS } from '../apollo/gql.js';
import Moment from 'react-moment';
import Rating from 'react-rating';
import MDSpinner from "react-md-spinner";


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
    return (
      <div>
<<<<<<< HEAD
        <Query query={GET_ALL_FINISHED_SESSIONS} variables={{id: user.id }}>
=======
        <Panel>
        <Query query={GET_ALL_FINISHED_SESSIONS} variables={{id: user.id }} onCompleted={(data) => console.log('data from querying session for all', data)}>
>>>>>>> dev
          {({ loading, error, data }) => {
            if (loading) return <div className="center"><MDSpinner className="centered" size="50" /></div>
            if (error) return <div>Error</div>
            return (
              <div>
                <Row >
                  <Col md={12}>
                    <Row>
                      <Col xs={6} md={4} style={{ padding: 0}}>
                        <Thumbnail className="centered" style={{margin: 0, padding: 0}}>
                          <h3>{data.getAllFinishedSessions.filter(x => x.expert.username === user.username).length}</h3>
                          <div style={{ fontSize: "10px", color: "grey"}}>QUESTIONS ANSWERED</div>
                        </Thumbnail>
                      </Col>
                      <Col xs={6} md={4} style={{ padding: 0}}>
                        <Thumbnail className="centered" style={{margin: 0, padding: 0}}>
                        <h5>Rating</h5>
                        <Rating readonly initialRating={data.getAllFinishedSessions.filter(x => x.expert.username === user.username).length === 0 ? 0 : user.ranking / (data.getAllFinishedSessions.filter(x => x.expert.username === user.username).length)  } /> <br />
                      </Thumbnail>
                      </Col>
                      <Col xs={6} md={4} style={{ padding: 0}}>
                        <Thumbnail className="centered" style={{margin: 0, padding: 0}}>
                        <h3>{user.questionsAsked.length}</h3>
                        <div style={{ fontSize: "10px", color: "grey"}}>QUESTIONS ASKED</div>
                      </Thumbnail>
                      </Col>
                    </Row>
<<<<<<< HEAD

                    <Row>
                      <Thumbnail className="centered">
                        <h3>Alt stats/graphs</h3>
                      <Rating readonly initialRating={data.getAllFinishedSessions.filter(x => x.expert.username === user.username).length === 0 ? 0 : user.ranking / (data.getAllFinishedSessions.filter(x => x.expert.username === user.username).length)  } /> <br />
                        <Query query={GET_USER_QUESTIONS} variables={{ username: user.username }} >
=======
                    <Row style={{ height: 400}}>
                    <Col md={6} style={{ padding: 0, height: 400}}>
                        <Panel className="centered">
                        <Panel.Heading>
                          <Panel.Title>
                      
                        <h3>Question History</h3>
                        </Panel.Title>
                          </Panel.Heading>
                          <Panel.Body style={{height: 400}}>
                        <Query query={GET_USER_QUESTIONS} variables={{ username: user.username }} onCompleted={(data) => console.log(data)}>
>>>>>>> dev
                          {({ loading, error, data }) => {
                            if (loading) return <div>Loading...</div>
                            if (error) return <div>Error</div>
                            return (
                              <div>
<<<<<<< HEAD
                                {data.questionsByUser.map((question, i) => <div key={i}>{i + 1} Title: {question.title} | Description: {question.description}</div>)}
=======
                                {data.questionsByUser.map((question, i) => <div key={i}><div><strong>{question.title}</strong></div><div>{question.description}</div></div>)}
>>>>>>> dev
                              </div>
                            )
                          }}
                        </Query>
                        </Panel.Body>
                        </Panel>
                      </Col>
                
                      <Col md={6} style={{ padding: 0, height: 400}}>
                        <Panel className="centered">
                        <Panel.Heading>
                          <Panel.Title>
                          <h3>Interaction History</h3>
                          </Panel.Title>
                          </Panel.Heading>
                          <Panel.Body style={{height: 400}}>
                            <div>
                              {data.getAllFinishedSessions.length > 0 ? (data.getAllFinishedSessions.map((session, i) => 
                              <div key={i}>
                              {user.username === session.expert.username ? 
                                <div><Image style={{width:20, borderRadius: 400}} src={user.image} /> You answered {session.pupil.username} and got {session.question.coins} coins</div> : 
                              <div><Image style={{width:20, borderRadius: 400}} src={session.expert.image} /> {session.expert.username} answered your question that cost -{session.question.coins} coins</div>}
                              </div>)) : <div>Uh Oh, no sessions</div>
                              }
                            </div>
                            </Panel.Body>
                        </Panel>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            )
          }}
        </Query>
        </Panel>
      
      </div>
    )
  }
}