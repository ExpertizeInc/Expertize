import React, { Component } from 'react';
import QuickView from './QuickView.jsx';
import SessionModal from '../sessions/SessionModal.jsx'
import { Col, Button, Panel, Row, Glyphicon, Badge } from "react-bootstrap";
import greenCircle from '../../dist/images/green_button.png';
import greyCircle from '../../dist/images/grey_button.png';
import Moment from 'react-moment';
import moment from 'moment'


export default class QuestionFeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow() {
    this.setState({ show: !this.state.show})
  }

  render() {
    const { question, user, match } = this.props;
    const { show } = this.state;
    return (
      <Panel>
      <QuickView user={user} show={show} toggleShow={this.toggleShow} question={question} />
        <Panel.Heading>
          <Panel.Title componentClass="h3">
          <img style={{ width: 20, height: 20, marginLeft: 3}} src={question.user && question.user.online === true ? greenCircle : greyCircle} alt={question.user && question.user.online === true ? 'online' : 'offline'}/>
           <strong>{question.title} at <Moment fromNow>{question.createdAt.toLocaleString()}</Moment></strong>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
            <Row>
              <Col sm={3}>
                <img src={question.user.image} onClick={() => this.toggleShow()} />
                <span className="centered" onClick={() => this.toggleShow()}><h4>{question.user ? question.user.username : '' }</h4></span>
                <div className="centered">
                  <span>{question.text ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="comment" /></Button>
                    : <Button className="round-btn"><Glyphicon glyph="comment" /></Button>
                  }</span>
                  <span>{question.audio ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="earphone" /></Button>
                    : <Button className="round-btn"><Glyphicon glyph="earphone" /></Button>
                  }</span>
                  <span>{question.video ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="facetime-video" /></Button>
                    : <Button className="round-btn"><Glyphicon glyph="facetime-video" /></Button>
                  }</span>
                </div>
              </Col>
              <Col sm={3}>{question.description}
              {question.tags.length > 1 
                ? 
                question.tags.map(tag => <Badge key={tag}>{tag}</Badge>)
                : 
                <Badge>{question.tags}</Badge>
              } 
              </Col>
              <Col sm={1}>
                <SessionModal question={question} user={user} />
              </Col>
            </Row>
        </Panel.Body>
      </Panel>
    )
  }
}

