import React from 'react'
import Moment from 'react-moment';
import { Panel, PanelGroup } from 'react-bootstrap';

const ReceivedMessages = (props) => (
  <PanelGroup accordion>
    {props.messages.map((message, i) => (
      <Panel eventKey={i + 1}>
      <Panel.Heading className="link-alt-blk">
        <Panel.Title toggle className="link-alt-blk">
          <div style={{ fontSize: "10px" }}><strong>{message.sender.username}</strong> - Message received on <Moment>{message.createdAt.toLocaleString()}</Moment></div>
          <strong>{message.title}</strong> 
        </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>{message.message}</Panel.Body>
      </Panel>
    ))}
  </PanelGroup>
)

export default ReceivedMessages