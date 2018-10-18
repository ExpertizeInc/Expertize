import React, { Component } from 'react';
import QuickView from './QuickView.jsx';
import SessionModal from '../sessions/SessionModal.jsx'
import { Col, Button, Panel, Row, Glyphicon, Badge, Grid, Image, Thumbnail } from "react-bootstrap";
import Moment from 'react-moment';
import userImage from '../../dist/images/user.png';

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
      {console.log(question)}
      <Row>
      <Panel >
      <QuickView question={question} user={user} show={show} toggleShow={this.toggleShow} />
        <Panel.Heading>
          <Panel.Title componentClass="h3">
          <button className="btn-online centered" style={{ backgroundColor: question.user && question.user.online === true ? '#1adda4' : '#999999' }}></button>
           <strong>{question.title}</strong>
          </Panel.Title>
        </Panel.Heading>
          <Grid fluid>   
        <Panel.Body> 
          
          <Col md={3}>
            <img src={question.user.image || userImage} style={{ height: 100, width: 100 }} onClick={() => this.toggleShow()} />
           
        </Col>
        <Col md={9}>
            <span className="centered" onClick={() => this.toggleShow()}><h5><strong>{question.user.username}</strong></h5></span>
            <div style={{ fontSize: "10px", color: "grey"}}><Moment fromNow>{(question.createdAt.toLocaleString()).toUpperCase()}</Moment></div> 
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
          <Badge>{question.tag.name}</Badge>
          <SessionModal question={question} user={user} />
          </Col>
    
        </Panel.Body>
      </Grid>
      </Panel>
      </Row>
      </Col>
    )
  }
}

