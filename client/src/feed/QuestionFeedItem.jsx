import React, { Component } from 'react';
import QuickView from './QuickView.jsx';
import SessionModal from '../sessions/SessionModal.jsx'
import { Col, Button, Panel, Row, Glyphicon, Badge, Grid, Thumbnail } from "react-bootstrap";
import greenCircle from '../../dist/images/green_button.png';
import greyCircle from '../../dist/images/grey_button.png';
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
    const { question, user, match } = this.props;
    const { show } = this.state;
    return (
      <Col md={6} style={{ display: "inline"}}>
      <Row>
      <Panel >
      <QuickView user={user} show={show} toggleShow={this.toggleShow} />
        <Panel.Heading>
          <Panel.Title componentClass="h3">
          <img style={{ width: 20, height: 20, marginLeft: 3}} src={question.user && question.user.online === true ? greenCircle : greyCircle} alt={question.user && question.user.online === true ? 'online' : 'offline'}/>
           <strong>{question.title}</strong>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body> 
          {/* <Grid fluid> */}
          <Row>
          <Col md={12}>
            <img src='http://placecorgi.com/100' onClick={() => this.toggleShow()} />
            <span className="centered" onClick={() => this.toggleShow()}><h4>{question.user.username}</h4></span>
            <Moment fromNow>{question.createdAt.toLocaleString()}</Moment>
        <div className="centered">
            <span>{question.text ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="comment" /></Button>
              : <Button id="disabled" className="round-btn"><Glyphicon glyph="comment" /></Button>
            }</span>{' '}
            <span>{question.audio ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="earphone" /></Button>
              : <Button id="disabled" className="round-btn"><Glyphicon glyph="earphone" /></Button>
            }</span>{' '}
            <span>{question.video ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="facetime-video" /></Button>
              : <Button id="disabled" className="round-btn"><Glyphicon glyph="facetime-video" /></Button>
            }</span>{' '}</div>
          
          <div>{question.description}</div>
          {question.tags.length > 1 
            ? 
            question.tags.map(tag => <Badge key={tag}>{tag}</Badge>)
            : 
            <Badge>{question.tags}</Badge>
          } 
          <SessionModal question={question} user={user} />
          </Col>
      </Row>
      {/* </Grid> */}
        </Panel.Body>
      </Panel>
      </Row>
      </Col>
    )
  }
}

