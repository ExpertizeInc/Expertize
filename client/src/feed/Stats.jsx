import React, { Component } from "react";
import { Link } from "react-router-dom";
import EditProfile from './EditProfile.jsx';
import { Panel, Button, Image, Glyphicon, ListGroup, ListGroupItem } from "react-bootstrap";
import userImage from '../../dist/images/user.png';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { showProfileEdit: false };
    this.hideProfileEdit = this.hideProfileEdit.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  hideProfileEdit() {
    this.setState({ showProfileEdit: false })
  }

  toggleShow() {
    this.setState({ showProfileEdit: !this.state.showProfileEdit})
  }

  render() {
    const { match, user, client } = this.props;
    const { showProfileEdit, toggleShow } = this.state;
    return (
      <React.Fragment>
        <Panel.Heading className="centered">
        {/* {console.log('USER', this.props)} */}
          <Panel.Title componentClass="h3" style={{ paddingTop: 10 }}>
          <Image src={user.image || userImage} style={{ height: 100, width: 100}} onClick={() => this.setState({ showProfileEdit: true })}></Image>
          {showProfileEdit
          ?
          < EditProfile user={user} show={showProfileEdit} toggle={this.toggleShow} client={client}/>
          :
          ''
          }
          </Panel.Title>
            <strong>{user.username}</strong>
        </Panel.Heading>
        <Panel.Body className="centered">
          <Button className="round-btn">
            <Link to={`${match.url}`}>
              <Glyphicon glyph="home" />
            </Link>
          </Button>
          <Button className="round-btn">
            <Link to={`${match.url}/profile`}>
              <Glyphicon glyph="user" />
            </Link>
          </Button>
          <Button className="round-btn">
            <Link to={`${match.url}/create`}>
              <Glyphicon glyph="pencil" />
            </Link>
          </Button>
          <Button className="round-btn">
            <Link to={`${match.url}/inbox`}>
              <Glyphicon glyph="envelope" />
            </Link>
          </Button>
        </Panel.Body>
        <ListGroup className="centered">
      <ListGroupItem><h4>{user.coins} <Image style={{ width: "20px" }} src="../../images/coin.gif"></Image></h4>
      <div style={{ fontSize: "10px", color: "grey"}}>TOTAL COINS</div>
      </ListGroupItem>
      <ListGroupItem><h4>{user.debt}</h4>
      <div style={{ fontSize: "10px", color: "grey"}}>TOTAL DEBT</div>
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
  }
}
