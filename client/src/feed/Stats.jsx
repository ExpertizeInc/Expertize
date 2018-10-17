import React from "react";
import { Link } from "react-router-dom";
import { Panel, Button, Image, Glyphicon, ListGroup, ListGroupItem, PanelGroup } from "react-bootstrap";

const Stats = ({ user, match }) => {
  return (
    <React.Fragment>
      {console.log(user, "USER")}
      <Panel.Heading className="centered">
        <Panel.Title componentClass="h3" style={{ paddingTop: "20px" }}>
        <Image src="http://placecorgi.com/100" style={{ borderRadius: "400px" }}></Image>
        </Panel.Title>
          <strong>{user.username}</strong>
      </Panel.Heading>
      <Panel.Body className="centered">
        <Button className="round-btn">
          <Link to={`${match.url}`}>
            <Glyphicon glyph="home" />
          </Link>
        </Button>{' '}
        <Button className="round-btn">
          <Link to={`${match.url}/profile`}>
            <Glyphicon glyph="user" />
          </Link>
        </Button>{' '}
        <Button className="round-btn">
          <Link to={`${match.url}/create`}>
            <Glyphicon glyph="pencil" />
          </Link>
        </Button>{' '}
        <Button className="round-btn">
          <Link to={`${match.url}/inbox`}>
            <Glyphicon glyph="envelope" />
          </Link>
        </Button>{' '}
      </Panel.Body>
      <ListGroup className="centered">
    <ListGroupItem><h4>{user.coins} <Image style={{ width: "20px" }} src="../../images/coin.gif"></Image></h4>
    <div style={{ fontSize: "10px", color: "grey"}}>TOTAL COINS</div>
    </ListGroupItem>
    <ListGroupItem><h4>{user.questionsAsked.filter(question => {
      return question.answeredBy === null
    }).length}</h4>
    <div style={{ fontSize: "10px", color: "grey"}}>ACTIVE QUESTIONS</div>
    </ListGroupItem>
    </ListGroup>
      <Panel.Body style={{ backgroundColor: "#f5f5f5"}}>
      </Panel.Body>
    </React.Fragment>
  );
};

export default Stats;
