import React, { Component } from 'react';
import TagDropdown from './TagDropdown.jsx';
import { Form, Panel, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

export default class QuestionFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    let { handleStatus, handleOrder, handleTag, handleChat, status, order, chat, tag } = this.props
    return (
      <React.Fragment>
        <Panel.Heading className="centered">
          <Panel.Title componentClass="h3">
            <strong>Filter Results</strong>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Form>
            <h4>Currently showing:</h4>
            <ToggleButtonGroup type="checkbox" value={status} onChange={handleStatus}>
              <ToggleButton className="btn-grp" value={'online'}>Online</ToggleButton>
              <ToggleButton className="btn-grp" value={'offline'}>Offline</ToggleButton>
            </ToggleButtonGroup>
            <h4>Users' questions sorted by</h4>
            <ToggleButtonGroup type="radio" name="radio" value={order} onChange={handleOrder} >
              <ToggleButton className="btn-grp" value='createdAt_DESC'>Most recent</ToggleButton>
              <ToggleButton className="btn-grp" value='createdAt_ASC'>Least recent</ToggleButton>
            </ToggleButtonGroup>
            <h4>Interested in</h4>
            <ToggleButtonGroup type="checkbox" value={chat} onChange={handleChat}>
              <ToggleButton className="btn-grp" value={'text'}>Text</ToggleButton>
              <ToggleButton className="btn-grp" value={'audio'}>Audio</ToggleButton>
              <ToggleButton className="btn-grp" value={'video'}>Video</ToggleButton>
            </ToggleButtonGroup>
            <h4>Containing</h4>
            <TagDropdown />
          </Form>
        </Panel.Body>
      </React.Fragment>
    );
  }
}
