import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_ALL_MESSAGES } from '../apollo/gql.js'
import MessageForm from './MessageForm.jsx'
import ReceivedMessages from './ReceivedMessages.jsx'
import SentMessages from './SentMessages.jsx'
import { Tab, Row, Col, Nav, NavItem, Panel } from 'react-bootstrap';


export default class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    let { user } = this.props
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col xs={6} md={3}>
              <Nav bsStyle="pills" stacked>
                <NavItem className="link-alt" eventKey="first">Recieved</NavItem>
                <NavItem className="link-alt" eventKey="second">Sent</NavItem>
                <NavItem className="link-alt" eventKey="third">Compose</NavItem>
              </Nav>
            </Col>
            <Query query={GET_ALL_MESSAGES} variables={{ username: user.username }}>
              {({ loading, error, data }) => {
                if (loading) return <div>Q Loading...</div>;
                if (error) return <div> Error {console.log(error)} </div>;
                return (
                  <Col sm={9}>
                    <Tab.Content animation>
                      <Tab.Pane eventKey="first"><ReceivedMessages messages={data.messagesReceived} /></Tab.Pane>
                      <Tab.Pane eventKey="second"><SentMessages messages={data.messagesSent} /></Tab.Pane>
                      <Tab.Pane eventKey="third"><MessageForm user={user} /></Tab.Pane>

                    </Tab.Content>
                  </Col>)
              }}
            </Query>
          </Row>
        </Tab.Container>
    );
  }
}
 
