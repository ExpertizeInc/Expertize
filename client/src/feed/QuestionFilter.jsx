import React, { Component } from 'react';
import TagDropdown from './TagDropdown.jsx';
import { Form, Panel, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

export default class QuestionFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    let { handleStatus, status, handleOrder, order, handleTag, tags } = this.props
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
            <h4>user's questions in </h4>
            <ToggleButtonGroup type="radio" name="options" onChange={handleOrder} value={order} defaultValue={'most'}>
              <ToggleButton className="btn-grp" value='most'>Most recent</ToggleButton>
              <ToggleButton className="btn-grp" value='least'>Least recent</ToggleButton>
            </ToggleButtonGroup>
            <h4>order containing</h4>
            <TagDropdown />
            <h4>tags.</h4>
          </Form>
        </Panel.Body>
      </React.Fragment>
    );
  }
}
