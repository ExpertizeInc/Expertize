import React, { Component } from 'react';
import QuickView from './QuickView.jsx';
import SessionModal from '../sessions/SessionModal.jsx'
import { Col, Button, Panel, Row, Glyphicon, Badge, Grid, Image, Thumbnail, ListGroup, ListGroupItem } from "react-bootstrap";
import Moment from 'react-moment';
import userImage from '../../dist/images/user.png';
import UpdateQuestionModal from './UpdateQuestionModal.jsx';

export default class QuestionFeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow() {
    const { show } = this.state;
    this.setState({ show: !show })
  }

  render() {
    const { question, user } = this.props;
    const { show } = this.state;
    const style = { fontSize: '10px', color: 'grey '};
    return (
      <Col md={12}>
        <Row>
          <Panel >
            <QuickView question={question} user={user} show={show} toggleShow={this.toggleShow} />
            <Panel.Heading className="centered">
              <Panel.Title componentClass="h3">
                <strong>{question.title} </strong>
              </Panel.Title>
            </Panel.Heading>
            <ListGroup>
              <ListGroupItem>
                <Row>
                <Col md={3}>     
                  <img src={question.user.image || userImage} style={{ height: 100, width: 100 }} onClick={this.toggleShow} />
                  <div className="centered" onClick={() => this.toggleShow()}>
                    <h5><strong>{question.user.username}</strong>
                      <button 
                        className="btn-online centered" 
                        style={{ backgroundColor: question.user && question.user.online === true ? '#1adda4' : '#999999' }}
                      />
                    </h5>
                  </div>               
                {question.user.linkedInProfile 
                ? 
                  <p className="btn-online left" style={style}>linkedIn Verified &#10004; </p>
                :
                  ''
                }
                <div style={{ fontSize: '10px', color: 'grey' }}>Added <Moment fromNow>{(question.createdAt.toLocaleString()).toUpperCase()}</Moment></div>
                </Col>
                <Col md={8}>
                <div style={{paddingBottom: 20}}>
                  <span>{question.text ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="comment" /></Button>
                    : <Button id="disabled" className="round-btn"><Glyphicon glyph="comment" /></Button>
                  }</span>{' '}
                  <span>{question.audio ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="earphone" /></Button>
                    : <Button id="disabled" className="round-btn"><Glyphicon glyph="earphone" /></Button>
                  }</span>{' '}
                  <span>{question.video ? <Button bsStyle="success" className="round-btn"><Glyphicon glyph="facetime-video" /></Button>
                    : <Button id="disabled" className="round-btn"><Glyphicon glyph="facetime-video" /></Button>
                  }</span></div>{' '}
                  <div style={style}>DESCRIPTION</div>
                <div>{question.description}</div>
                <Badge>{question.tag.name}</Badge>
                </Col>
                <Col className="center" md={1}>
                  {question.user.username === user.username ? '' : <SessionModal question={question} user={user} /> }
                  {question.user.username === user.username ? <UpdateQuestionModal user={user} question={question}/> : ''}
                </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
            <Panel.Body style={{ backgroundColor: '#f5f5f5' }}>
            </Panel.Body>
          </Panel>
        </Row>
      </Col>
    )
  }
}

