import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Col, Tabs, Tab, Button, ToggleButtonGroup, ToggleButton, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import gql from "graphql-tag";

const CREATE_PROFILE = gql`
mutation createProfile($userId: Int!, $description: String!, $coins: Int) {
    createProfile(userId: $userId, description: $description, coins: 3) {
        userId
        description
    }
}
`;

class Questionaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'corgi',
      userId: 1,
      description: 'i am a corgi',
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
    if (length > 12 || length === 0) return 'error';
  }

  handleButtonToggle(e) {
    this.setState({ value: e });
  }

  handleSelect(key) {
    this.setState({ key });
  }

  handleInput(e, type) {
    e.preventDefault()
    this.setState({
      [type]: e.target.value
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
    const { description, userId } = this.state
    return (
      <Tabs defaultActiveKey={1} id="controlled-tab" activeKey={this.state.key} onSelect={this.handleSelect}>
        <Tab eventKey={1} title="Pick a username">
          <Form className="form-panel-question">
            <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
              <Col xsOffset={5} sm={2}>
                <ControlLabel>Pick a unique username.</ControlLabel>
                <FormControl type="text" value={this.state.username} onChange={(e) => this.handleInput(e, 'username')} />
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
          <Col smOffset={4} sm={3}>
            <div class="hexagon" style={{ backgroundImage: "url('http://placecorgi.com/150')" }}>
              <div class="hexTop"></div>
              <div class="hexBottom"></div>
            </div>
            <FormGroup controlId="formControlsTextarea">
              <h2>{this.state.username}, </h2>
              <ControlLabel>Let us know a little about yourself</ControlLabel>
              <FormControl componentClass="textarea" value={this.state.description} onChange={(e) => this.handleInput(e, 'description')} />
            </FormGroup>
          </Col>
          <FormGroup>
            <Col smOffset={5} sm={2}>
              <Button type="submit" onClick={this.nextStep}>
                Proceed to the next step
                </Button>
            </Col>
          </FormGroup>
        </Tab>
        <Tab eventKey={3} title="Set up profile">
          {/* only show if user did not select linkedin oauth signup. maybe pick avatar here too */}
          <Col smOffset={4} sm={3}>
            <div>We use LinkedIn to tailor the experience for you. Would you like to connect in order to:</div>
            <div>- Automatically create your profile</div>
            <div>- Receive recommendations based on your interests</div>
            <div>- or -</div>
            <a onClick={this.nextStep}>Skip this step for now</a>
          </Col>
        </Tab>
        <Tab eventKey={4} title="Expertize">
          <Col xsOffset={4} sm={4}>
          <div class="hexagon" style={{ backgroundImage: "url('http://placecorgi.com/150')" }}>
              <div class="hexTop"></div>
              <div class="hexBottom"></div>
            </div>
            <h2>{this.state.username}</h2>
            <div>{this.state.description}</div>
            Select your experience:
          <ToggleButtonGroup type="checkbox" value={this.state.value} onChange={this.handleButtonToggle}>
              {/* todo: pull from linkedin industry list then map tags */}
              <ToggleButton value="Art">Art</ToggleButton>
              <ToggleButton value="Engineering">Engineering</ToggleButton>
              <ToggleButton value="Music">Music</ToggleButton>
              <ToggleButton value="Programming">Programming</ToggleButton>
            </ToggleButtonGroup>
            <div>{this.state.value.map(tag =>  <div><Label>{tag}</Label>{' '}</div>)}</div>

            <div>What are you interested in?</div>
            {/* todo: add a search or give some recommendations */}
            <div>
              {/* submit compiled user details to database. render user's profile complete w/ details */}

              <Mutation mutation={CREATE_PROFILE} variables={{ userId, description }}>
                { createProfile => <Link to="/profile">
                  <Button type="submit" onClick={createProfile}>
                    LETS GOOOOOOOO
                  </Button>
                </Link>}
              </Mutation>


            </div>
          </Col>
        </Tab>
      </Tabs>
      )
  }
}
 
export default Questionaire;
