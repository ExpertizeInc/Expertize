import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Col, Tabs, Tab, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Questionaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      key: 1,
      value: []
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleButtonToggle = this.handleButtonToggle.bind(this)
    this.handleSubmitInfo = this.handleSubmitInfo.bind(this)
  }

  getValidationState () {
    const length = this.state.username.length;
    if (length > 12) return 'success';
    else if (length > 3) return 'warning';
    else if (length > 0) return 'error';
  }

  handleButtonToggle(e) {
    this.setState({ value: e });
  }

  handleSelect(key) {
    this.setState({ key });
  }

  handleInput(e) {
    this.setState({
      username: e.target.value
    })
  }

  nextStep(e) {
    e.preventDefault()
    this.setState({ key: ++this.state.key})
  }

  handleSubmitInfo() {
    // save data and render profile
  }

  render() { 
    return (
      <Tabs defaultActiveKey={1} id="controlled-tab" activeKey={this.state.key} onSelect={this.handleSelect}>
        <Tab eventKey={1} title="Pick a username">
          <Form className="form-panel-question">
            <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
              <Col xsOffset={5} sm={2}>
                <ControlLabel>Pick a unique username.</ControlLabel>
                <FormControl type="text" value={this.state.value} placeholder="" onChange={this.handleInput} />
                <FormControl.Feedback />
                <HelpBlock>Pick a username.</HelpBlock>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={5} sm={2}>
                <Button type="submit" onClick={this.nextStep}>
                  Submit
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Tab>
        <Tab eventKey={2} title="Set up profile">
        {/* only show if user did not select linkedin oauth signup. maybe pick avatar here too */}
        <Col smOffset={4} sm={3}>
          <div>We use LinkedIn to tailor the experience for you. Would you like to connect in order to:</div>
          <div>- Automatically create your profile</div>
          <div>- Receive recommendations based on your interests</div>
          <div>- or -</div>
          <a onClick={this.nextStep}>Skip this step for now</a>
        </Col>
        </Tab>
        <Tab eventKey={3} title="Expertize">
        <Col xsOffset={4} sm={4}>
          Select your experience:
          <ToggleButtonGroup type="checkbox" value={this.state.value} onChange={this.handleButtonToggle}>
          {/* todo: pull from linkedin industry list then map tags */}
            <ToggleButton value="Art">Art</ToggleButton>
            <ToggleButton value="Engineering">Engineering</ToggleButton>
            <ToggleButton value="Music">Music</ToggleButton>
            <ToggleButton value="Programming">Programming</ToggleButton>
          </ToggleButtonGroup>
          <div>What are you interested in?</div>
          {/* todo: add a search or give some recommendations */}
          <div>
            {/* submit compiled user details to database. render user's profile complete w/ details */}
            <Link to="/profile">
            <Button type="submit" onClick={this.handleSelect}>
              LETS GOOOOOOOO
            </Button>
            </Link>
          </div>
          </Col>
          {this.state.value}
        </Tab>
      </Tabs>
      )
  }
}
 
export default Questionaire;
