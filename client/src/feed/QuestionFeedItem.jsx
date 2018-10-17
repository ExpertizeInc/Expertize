import React, { Component } from 'react';
import QuickView from './QuickView.jsx';
import SessionModal from '../sessions/SessionModal.jsx'
import { Col, Button, Panel, Row, Glyphicon, Badge, Grid, Image, Thumbnail } from "react-bootstrap";
import greenCircle from '../../dist/images/green_button.png';
import greyCircle from '../../dist/images/grey_button.png';
import Moment from 'react-moment';

export default class QuestionFeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow() {
    const { show } = this.state;
    this.setState({ show: !show})
  }

  render() {
    const { question, user } = this.props;
    const { show } = this.state;
    return (
      <Col md={12}>
      <Row>
      <Panel >
      <QuickView question={question} user={user} show={show} toggleShow={this.toggleShow} />
        <Panel.Heading>
          <Panel.Title componentClass="h3">
          <button className="btn-online centered" style={{ backgroundColor: question.user && question.user.online === true ? '#1adda4' : '#999999' }}></button>
          {/* <img style={{ width: 20, height: 20, marginLeft: 3}} src={question.user && question.user.online === true ? greenCircle : greyCircle} alt={question.user && question.user.online === true ? 'online' : 'offline'}/> */}
           <strong>{question.title}</strong>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body> 
          {/* <Grid fluid> */}
          
          <Col md={2}>
            <img src='http://placecorgi.com/70' onClick={() => this.toggleShow()} />
            <span className="centered" onClick={() => this.toggleShow()}><h5>{question.user.username}</h5></span>
            <Moment fromNow>{question.createdAt.toLocaleString()}</Moment>
        </Col>
        <Col md={10}>
        <div>
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
          {/* {question.tag.name} */}
          <SessionModal question={question} user={user} />
          </Col>
    
      {/* </Grid> */}
        </Panel.Body>
      </Panel>
      </Row>
      </Col>
    )
  }
}

