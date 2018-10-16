import React, { Component } from 'react';
import QuickView from './QuickView.jsx';
import SessionModal from '../sessions/SessionModal.jsx'
import { Col, Button, Panel, Grid, Row, Glyphicon, Badge } from "react-bootstrap";
import Moment from 'react-moment';
import moment from 'moment'


export default class QuestionFeedItem extends Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
    this.toggleShow = this.toggleShow.bind(this)
  }

  toggleShow() {
    this.setState({ show: !this.state.show})
  }


  render() {
    let { question, user } = this.props
    return (
      <Panel>
      <QuickView user={user} show={this.state.show} toggleShow={this.toggleShow} />
        <Panel.Heading>
          <Panel.Title componentClass="h3">
           <strong>{question.title} at <Moment fromNow>{question.createdAt.toLocaleString()}</Moment></strong>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
            <Row>
              <Col sm={3}>
                <img src='http://placecorgi.com/150' onClick={() => this.toggleShow()} />
           
                <span className="centered" onClick={() => this.toggleShow()}><h4>{question.user.username}</h4></span>
           <div className="centered">
                <span>{question.text ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="comment" /></Button>
                  : <Button className="round-btn"><Glyphicon glyph="comment" /></Button>
                }</span>{' '}
                <span>{question.audio ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="earphone" /></Button>
                  : <Button className="round-btn"><Glyphicon glyph="earphone" /></Button>
                }</span>{' '}
                <span>{question.video ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="facetime-video" /></Button>
                  : <Button className="round-btn"><Glyphicon glyph="facetime-video" /></Button>
                }</span>{' '}</div>
              
              </Col>
              <Col sm={3}>{question.description}
              {question.tags.length > 1 ? question.tags.map((tag, i) => <Badge key={i+1}>{tag}</Badge>)
              : 
              <Badge>{question.tags}</Badge>} </Col>
              {/* <Col sm={3}>
                <div>{question.text ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="comment" /></Button>
                  : <Button className="round-btn"><Glyphicon glyph="comment" /></Button>
                }</div>
                <div>{question.audio ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="earphone" /></Button>
                  : <Button className="round-btn"><Glyphicon glyph="earphone" /></Button>
                }</div>
                <div>{question.video ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="facetime-video" /></Button>
                  : <Button className="round-btn"><Glyphicon glyph="facetime-video" /></Button>
                }</div>
              </Col> */}
              <Col sm={1}>
                <SessionModal question={question} user={user} />
              </Col>
            </Row>
        </Panel.Body>
      </Panel>
    )
  }
}

