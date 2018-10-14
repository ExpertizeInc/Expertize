import React, { Component } from 'react';
import QuickView from './QuickView.jsx';
import SessionModal from '../sessions/SessionModal.jsx'
import { Col, Button, Panel, Grid, Row, Glyphicon, Badge } from "react-bootstrap";

export default class QuestionFeedItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
    this.toggleShow = this.toggleShow.bind(this)
  }

  toggleShow() {
    this.setState({ show: !this.state.show})
  }


  render() {
    let { question, user, match } = this.props
    return (
      <Panel>
      <QuickView user={user} show={this.state.show} toggleShow={this.toggleShow} />
        <Panel.Heading>
          <Panel.Title componentClass="h3">
           <strong>{question.title}</strong>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
            <Row>
              <Col sm={3}>
                <div className="hexagon" style={{ backgroundImage: "url('http://placecorgi.com/150')" }} onClick={() => this.toggleShow()}>
                  <div className="hexTop" />
                  <div className="hexBottom" />
                </div>
                <div className="centered" onClick={() => this.toggleShow()}><strong>@{question.user.username}</strong></div>
              </Col>
              <Col sm={3}>{question.description}
              {question.tags.length > 1 ? question.tags.map((tag, i) => <Badge>{tag}</Badge>)
              : 
              <Badge>{question.tags}</Badge>} </Col>
              <Col sm={3}>
                <div>{question.text ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="comment" /></Button>
                  : <Button className="round-btn"><Glyphicon glyph="comment" /></Button>
                }</div>
                <div>{question.audio ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="earphone" /></Button>
                  : <Button className="round-btn"><Glyphicon glyph="earphone" /></Button>
                }</div>
                <div>{question.video ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="facetime-video" /></Button>
                  : <Button className="round-btn"><Glyphicon glyph="facetime-video" /></Button>
                }</div>
              </Col>
              <Col >
                <SessionModal match={match} question={question} user={user} />
              </Col>
            </Row>
        </Panel.Body>
      </Panel>
    )
  }
}

