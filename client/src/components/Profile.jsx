import React, { Component } from 'react';
import { Grid, Col, Row, PageHeader, Thumbnail } from 'react-bootstrap'
import { Mutation, Query } from 'react-apollo';
import { UPDATE_USER, GET_USER_QUESTIONS, GET_USER_UID } from '../gql.js';
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
          <Grid fluid >
          {console.log(user, 'ASDASD')}
            <PageHeader style={{display: 'flex', justifyContent: 'center' }}>Profile</PageHeader>
            <div className="hexagon" style={{ backgroundImage: `url(${user.image})` }}>
              <div className="hexTop" />
              <div className="hexBottom"/>
            </div>
            <Col xs={5} md={2} className="centered">
            <Thumbnail className="centered">
           <span>Username: <h4>{user.username}</h4></span>
            <span>Email: <h4>{user.email}</h4></span>
              </Thumbnail>
            </Col>
            <Row >
              <Col xs={6} md={3}>
                <Thumbnail className="centered">
                  <span><h4>{user.tags.length > 1 ? user.tags.map(tag => <ul key={tag}>{tag}</ul>) : user.tags }</h4></span>
                  Tags
                </Thumbnail>
              </Col>
                <Col xs={6} md={3}>
                  <Thumbnail className="centered">
                    <h3>{user.coins}</h3>
                    Coins
                  </Thumbnail>
                </Col>
                <Col xs={6} md={3}>
                  <Thumbnail className="centered">
                  <Rating
                    readonly
                    initialRating={user.ranking}
                  /> <br />
                    Overall Rating
                  </Thumbnail>
                </Col>
            </Row>
            <Row>
              <Col>
                <Thumbnail className="centered">
                  <h3>Alt stats/graphs</h3>
                  <Query query={GET_USER_QUESTIONS} variables={{ userId: user.id }} onCompleted={(data) => console.log(data)}>
                    {({ loading, error, data }) => {
                      if (loading) return <div>Loading...</div>
                      if (error) return <div>Error</div>
                      return (
                        <div>
                          {data.questionsByUser.map((question, i) => <div key={i}>{i+1} Title: {question.title} | Description: {question.description}</div>)}
                        </div>
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
            {/* <Row>
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
            </Row> */}
          </Grid>
        }
      </div>
    )
  }
};