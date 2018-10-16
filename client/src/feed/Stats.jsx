import React from "react";
import { Link } from "react-router-dom";
import { Panel, Button, Glyphicon } from "react-bootstrap";

const Stats = props => {
  let { user, match } = props;
  console.log("stats", match);
  return (
    <React.Fragment>
      <Panel.Heading className="centered">
        <Panel.Title componentClass="h3">
          <strong>{user.username}</strong>
        </Panel.Title>
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
    </React.Fragment>
  );
};

export default Stats;
