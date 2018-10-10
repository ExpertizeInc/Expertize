import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Col, Tabs, Tab, Button, Label, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import TagDropdown from './loggedInHome/TagDropdown.jsx';
import { UPDATE_USER_INFO, GET_USER_INFO, GET_USER_QUESTIONS, CREATE_LINKED_IN_USER } from '../gql.js'; 

export default class Questionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ' ',
      description: ' ',
      coins: 3,
      key: 1,
      value: [],
      tags: [],
      image: '',
      show: false,
      firstName: '',
      lastName: '',
      linkedInEmail: '',
      linkedInId: '',
      email: ''
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleButtonToggle = this.handleButtonToggle.bind(this);
    this.handleSubmitInfo = this.handleSubmitInfo.bind(this);
    this.addTags = this.addTags.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  componentDidMount() {
    const { emailAddress, firstName, lastName, headline, id, pictureUrl } = this.props.LIResults;
    this.setState({ image: pictureUrl, firstName, lastName, linkedInEmail: emailAddress, linkedInId: id, email: emailAddress })
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
    if (this.state.username.length <= 3) {
      this.setState({ show: true })
    } else {
      this.setState({ key: ++this.state.key });
    }
  }

  handleDismiss() {
    this.setState({ show: false })
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
    const { description, coins, tags, key, username, value, image, show, linkedInEmail, linkedInId, email } = this.state
    const { user } = this.props;
    console.log('modal', this.state)

    return (
      <Tabs defaultActiveKey={1} id="controlled-tab" activeKey={key} onSelect={this.handleSelect}>
      {console.log(user, 'USER IN Q')}
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
                {show ?
                  <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                    <h4>Oh snap! You got an error!</h4>
                    <p>Please increase the length of your input</p>
                    <p><Button onClick={this.handleDismiss}>Hide Alert</Button></p>
                  </Alert>
                  :
                  ''
                }
              </Col>
            </FormGroup>
          </Form>
        </Tab>
        <Tab eventKey={2} title="Set up profile">
          <Col smOffset={4} sm={3}>
            <div className="hexagon" style={{ backgroundImage: `url(${image})` }}>
              <div className="hexTop" />
              <div className="hexBottom" />
            </div>
            <FormGroup controlId="formControlsTextarea">
              <h2>{username}, </h2>
              {image 
              ? 
                // <input type="text" value={image} />
                <div />
              :
              <div>
                <h3>Please enter a profile picture url:</h3>
                <input type="text" value={image} onChange={(e) => this.handleInput(e, 'image')} />
              </div>
              }

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
            <div className="hexagon" style={{ backgroundImage: `url(${user && user.image ? user.image : image ? image : 'http://www.jesuschristsavior.net/Savior.jpeg'})` }}>
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
            <h2>{username}</h2>
            <div>{description}</div>
            {console.log(this.state)}
            Select your experience: &nbsp;
            <TagDropdown userId={user ? user.id : ''} addTags={this.addTags}/>
            <div>{value.map(tag => <div key={tag}><Label>{tag}</Label>{' '}</div>)}</div>
            <div>What are you interested in?</div>
            {tags.length > 0 ? tags.map(tag => <li key={tag}>{tag}</li>) : tags ? tags.join() : <div>No Tags Currently</div> }
            {/* todo: add a search or give some recommendations */}
            <div><br/>
              {/* submit compiled user details to database. render user's profile complete w/ details */}
              {user ?
                <Mutation 
                  mutation={UPDATE_USER_INFO} 
                  variables={{ id: user.id, description, tags, username, image }}
                >
                  {updateUser => (
                    <Link to="/profile">
                      <Button type="submit" onClick={updateUser}>Save Profile Info</Button>
                    </Link>
                  )}
                </Mutation> 
                : 
                <Mutation 
                mutation={CREATE_LINKED_IN_USER} 
                variables={{ linkedInId, linkedInEmail, email, description, tags, username, image }}
                onCompleted={(data) => this.props.history.push('/home')}
              >
                {createLinkedInUser => (
                  <Link to="/profile">
                    <Button type="submit" onClick={createLinkedInUser}>Save Profile</Button>
                  </Link>
                )}
              </Mutation> 
                }
            </div>
          </Col>
        </Tab>
      </Tabs>
      )
  }
}
