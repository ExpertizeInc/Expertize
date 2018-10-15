import React, { Component } from 'react'
import { FINISH_SESSION } from '../apollo/gql.js'
import { Mutation } from 'react-apollo';
import { Button, Modal, Glyphicon, Well, Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import { Checkbox } from 'react-bootstrap'

class Survey extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0
    }
  }

  render() {
    const { session, match } = this.props
    console.log('the props in survey', this.props)
    console.log('id', session.id, 'completed:', true, 'user:', session.pupil.id, 'answeredBy:', session.expert.username, 'question:', session.question.id, 'endedAt', Date.now(), 'expertCoins:', session.expert.coins + session.question.coins, 'pupilCoins:', session.pupil.coins - session.question.coins)
    return (
      <div>
        <h1>rate your Expert!</h1>
        <Mutation mutation={FINISH_SESSION} variables={{ id: session.id, completed: true, user: session.pupil.id, answeredBy: { connect: { username: session.expert.username }}, question: session.question.id, endedAt: Date.now(), expertCoins: session.expert.coins + session.question.coins, pupilCoins: session.pupil.coins - session.question.coins, expertRating: session.expert.ranking + 10, pupilRating: session.pupil.ranking}}>
        {updateSession => <Button onClick={updateSession}>Okay</Button>}
        </Mutation>
      </div>
    )
  }

}

export default Survey