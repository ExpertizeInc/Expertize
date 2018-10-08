import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Col, Tabs, Tab, Button, ToggleButtonGroup, ToggleButton, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import TagDropdown from './loggedInHome/TagDropdown.jsx';
import { UPDATE_USER_INFO } from '../gql.js'; 

export default class Questionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'corgi',
      description: 'i am a corgi',
      coins: 3,
      key: 1,
      value: [],
      tags: []
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleButtonToggle = this.handleButtonToggle.bind(this)
    this.handleSubmitInfo = this.handleSubmitInfo.bind(this)
    this.addTags = this.addTags.bind(this)
  }

  componentDidMount() {
    console.log(this.props.user)
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
    e.preventDefault();
    this.setState({ [type]: e.target.value });
  }

  nextStep(e) {
    e.preventDefault();
    this.setState({ key: ++this.state.key });
  }

  handleSubmitInfo() {
    // save data and render profile
  }

  addTags(e) {
    if (this.state.tags.includes(e)) {
      alert('Tag already added')
    } else if (this.state.tags.length >= 5) {
      alert('No more than 5 tags per profile');
    } else {
      this.setState({ tags: [e, ...this.state.tags]});
    }
  }

  render() { 
    const { description, coins, tags, key, username, value } = this.state
    const { user } = this.props;
    return (
      <Tabs defaultActiveKey={1} id="controlled-tab" activeKey={key} onSelect={this.handleSelect}>
        <Tab eventKey={1} title="Pick a username">
          <Form className="form-panel-question">
            <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
              <Col xsOffset={5} sm={2}>
                <ControlLabel>Pick a unique username</ControlLabel>
                <FormControl type="text" value={username} onChange={(e) => this.handleInput(e, 'username')} />
                <FormControl.Feedback />
                <HelpBlock>Pick a username</HelpBlock>
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
            <div className="hexagon" style={{ backgroundImage: "url('http://placecorgi.com/150')" }}>
              <div className="hexTop" />
              <div className="hexBottom" />
            </div>
            <FormGroup controlId="formControlsTextarea">
              <h2>{username}, </h2>
              <ControlLabel>Let us know a little about yourself</ControlLabel>
              <FormControl componentClass="textarea" value={description} onChange={(e) => this.handleInput(e, 'description')} />
            </FormGroup>
          </Col>
          <FormGroup>
            <Col smOffset={5} sm={2}>
              <Button type="submit" onClick={this.nextStep}>Proceed to the next step</Button>
            </Col>
          </FormGroup>
        </Tab>
        <Tab eventKey={3} title="Set up profile">
          {/* only show if user did not select linkedin oauth signup. maybe pick avatar here too */}
          <Col smOffset={4} sm={3}><br/>
            <div>We use LinkedIn to tailor the experience for you. Would you like to connect in order to:</div><br />
            <li>Automatically create your profile</li>
            <li>Receive recommendations based on your interests</li><br />
            <a href="#" onClick={this.nextStep} style={{ color: 'blue' }}>Skip this step for now</a>
          </Col>
        </Tab>
        <Tab eventKey={4} title="Expertize">
          <Col xsOffset={4} sm={4}>
            <div className="hexagon" style={{ backgroundImage: "url('http://placecorgi.com/150')" }}>
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
            <h2>{username}</h2>
            <div>{description}</div>
            Select your experience: &nbsp;
            <TagDropdown userId={user ? user.id : ''} addTags={this.addTags}/>
            <div>{value.map(tag => <div key={tag}><Label>{tag}</Label>{' '}</div>)}</div>
            <div>What are you interested in?</div>
            {tags.length > 0 ? tags.map(tag => <li key={tag}>{tag}</li>) : ''}
            {/* todo: add a search or give some recommendations */}
            <div><br/>
              {/* submit compiled user details to database. render user's profile complete w/ details */}
              {user ?
                <Mutation mutation={UPDATE_USER_INFO} variables={{ id: user.id, email: 'update@update.com', description, coins, tags }}>
                  {updateUser => (
                    <Link to="/profile">
                      <Button type="submit" onClick={updateUser}>Save Profile Info</Button>
                    </Link>
                  )}
                </Mutation> 
                : ''}
            </div>
          </Col>
        </Tab>
      </Tabs>
      )
  }
}
