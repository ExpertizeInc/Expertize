import React, { Component } from 'react'
import { FINISH_SESSION, GET_USER_UID } from '../apollo/gql.js'
import { Mutation } from 'react-apollo';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Rating from 'react-rating'

class Survey extends Component {
  constructor(props) {
    super(props)
    this.state = { rating: 3 }; 
    this.handleRatingClick = this.handleRatingClick.bind(this)
  }

  handleRatingClick(value) {
    this.setState({rating: value })
  }

  render() {
    const { session } = this.props
    const now = new Date().toISOString()
    return (
      <React.Fragment>
        <h1>rate your Expert!</h1>
        <Rating placeholderRating={this.state.rating} onClick={(value) => this.handleRatingClick(value)}/> <br/>
        <Mutation mutation={FINISH_SESSION} 
          variables={{ id: session.id, completed: true, user: session.pupil.id, answeredBy: { connect: { username: session.expert.username }}, questionId: session.question.id, endedAt: now, expertCoins: session.expert.coins + 2, pupilCoins: session.pupil.coins, expertUser: session.expert.id, expertRating: session.expert.ranking + this.state.rating, pupilRating: session.pupil.ranking}}
          refetchQueries={() => [{ query: GET_USER_UID , variables: { uid: user.uid }} ]}
          > 
        {updateSession => <Link to="/"><Button onClick={() => {updateSession()}}>Okay</Button></Link>}
        </Mutation>
      </React.Fragment>
    )
  }

}

export default Survey