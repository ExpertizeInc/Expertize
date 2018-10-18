import React, { Component } from 'react'
import { FINISH_SESSION } from '../apollo/gql.js'
import { Mutation } from 'react-apollo';
import { Button, Modal, Glyphicon, Well, Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Rating from 'react-rating'

import { Checkbox } from 'react-bootstrap'

class Survey extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 3
    }
    this.handleRatingClick = this.handleRatingClick.bind(this)
  }

  handleRatingClick(value) {
    this.setState({
      rating: value
    }, () => console.log('rating after click', this.state.rating))
  }

  render() {
    const { session, match } = this.props
    const now = new Date().toISOString()
    console.log('id', session.id, 'completed:', true, 'user:', session.pupil.id, 'answeredBy:', session.expert.username, 'question:', session.question.id, 'endedAt', new Date().toISOString(), 'expertCoins:', session.expert.coins + 2, 'pupilCoins:', session.pupil.coins - session.question.coins, 'expertRating', session.expert.ranking + this.state.rating, 'pupilRating:', session.pupil.ranking)
    return (
      <div>
        <h1>rate your Expert!</h1>
        <Rating placeholderRating={this.state.rating} onClick={(value) => this.handleRatingClick(value)}/> <br/>
        <Mutation mutation={FINISH_SESSION} variables={{ id: session.id, completed: true, user: session.pupil.id, answeredBy: { connect: { username: session.expert.username }}, questionId: session.question.id, endedAt: now, expertCoins: session.expert.coins + 2, pupilCoins: session.pupil.coins, expertUser: session.expert.id, expertRating: session.expert.ranking + this.state.rating, pupilRating: session.pupil.ranking}}> 
        {updateSession => <Link to="/"><Button onClick={() => {updateSession()}}>Okay</Button></Link>}
        </Mutation>
      </div>
    )
  }

}

export default Survey