import React, { Component } from 'react';
import QuickView from './QuickView.jsx';
import SessionModal from './SessionModal.jsx'
import { Col, Button, Panel, Grid, Row, Glyphicon } from "react-bootstrap";

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
      <div>
        <QuickView user={user} show={this.state.show} toggleShow={this.toggleShow} />
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">
            Title: {question.title} | Tag: {question.tags.length > 1 ? question.tags.map((tag, i) => tag.concat(', '))
              : 
              question.tags} 
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Grid>
            <Row>
              <Col sm={2}>
                <div className="hexagon" style={{ backgroundImage: "url('http://placecorgi.com/150')" }} onClick={() => this.toggleShow()}>
                  <div className="hexTop" />
                  <div className="hexBottom" />
                </div>
                <div onClick={() => this.toggleShow()}>{question.user.username}</div>
              </Col>
              <Col sm={3}>{question.description}</Col>
              <Col sm={2}>
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
              <Col sm={1}>
                <SessionModal match={match} question={question} user={user} />
              </Col>
            </Row>
          </Grid>
        </Panel.Body>
      </Panel>
      </div>
    )
  }
}

