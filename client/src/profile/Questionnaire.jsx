import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Col, Tabs, Tab, Button, Label } from 'react-bootstrap';
import TagDropdown from '../feed/TagDropdown.jsx';
import { UPDATE_USER_INFO } from '../apollo/gql.js'; 
import userImage from '../../dist/images/user.png';
import axios from 'axios';

export default class Questionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      description: '',
      coins: 3,
      key: 1,
      value: [],
      tags: [],
      image: '',
      show: false,
      firstName: '',
      lastName: '',
      linkedInEmail: '',
      email: '',
      percentage: 0,
      image: '',
      addPicture: false, 
      useLinkedInImage: false
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleButtonToggle = this.handleButtonToggle.bind(this);
    this.addTags = this.addTags.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
  }

  getValidationState (e) {
    e.preventDefault()
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
      this.setState({ key: ++this.state.key, percentage: this.state.percentage + 25 });
    }
  }

  handleDismiss() {
    this.setState({ show: false })
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

  updateUserInfo() {
    const { client, user, history } = this.props;
    const { description, coins, tags, username, image } = this.state;
    client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: user.id, email: user.email, description, coins, tags: tags || [], username, image: image !== '' ? image : userImage } })
      .then(({data}) => history.push('/home'))
      .catch((err) => console.error('FUCK', err))
  }

  render() { 
    const { description, key, username, value, image, addPicture } = this.state
    const { user, client } = this.props;
    return (
      <div>
      {user 
        ? 
        <Tabs defaultActiveKey={1} id="controlled-tab" activeKey={key} onSelect={this.handleSelect}>
          <Tab eventKey={1} title="Pick a username">
            <Form className="form-panel-question">
              <FormGroup controlId="formBasicText" onClick={(e) => this.getValidationState(e)}>
                <Col xsOffset={5} sm={2}>
                  <ControlLabel>Pick a unique username</ControlLabel>
                  <FormControl type="text" value={username} placeholder={user.username} onChange={(e) => this.handleInput(e, 'username')} />
                  <FormControl.Feedback />
                  <HelpBlock>Pick a username</HelpBlock>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={5} sm={2}>
                  <Button type="submit" onClick={this.nextStep}>Submit</Button>
                </Col>
              </FormGroup>
            </Form>
          </Tab>
          <Tab eventKey={2} title="Set Up Profile">
            <Col smOffset={4} sm={3}>
              <FormGroup controlId="formControlsTextarea">
                <h2>{username}, </h2>
                <ControlLabel>Let us know a little about yourself</ControlLabel>
                <FormControl componentClass="textarea" value={description} onChange={(e) => this.handleInput(e, 'description')} />
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
            {/* // only show if user did not select linkedin oauth signup. maybe pick avatar here too */}
            <Col smOffset={4} sm={3}>
            {console.log(localStorage.getItem('fbOrLi'))}
              {localStorage.getItem('fbOrLi') === "linkedIn" 
                ?
                <div>
                  Would you like to use your linkedIn profile picture?<br/><br/>
                  <Button 
                    onClick={(e) => {
                      this.setState({ useLinkedInImage: true, image: user.image })
                      this.nextStep(e)
                    }}
                  >Yes</Button><br/>
                  Or add your own photo:<br/>
                  <FormControl 
                    onChange={(e) => this.setState({ image: e.target.value })} 
                    placeholder="Add a profile image"/><br/><br />
                  <Button 
                    onClick={() => {
                      axios.post('/shorten', { image })
                        .then(({data}) => this.setState({ image: data }, console.log(data, "DATA")))
                        .catch(err => alert('Image Could Not Be Saved!'))
                    }}
                  >Add Image</Button>                  
                </div>
                :
                <div>
                  <Button onClick={() => this.setState({ addPicture: true })}>Would you like to add a photo?</Button>
                  {addPicture 
                  ? 
                  <FormGroup>
                    <FormControl onChange={(e) => this.setState({ image: e.target.value })} placeholder="Add a profile image"/><br/><br />
                  </FormGroup>
                  :
                  ''
                  }
                </div>
              }
              <br/>
              <div>- or -</div><br/>
              <Button onClick={this.nextStep}>Skip this step for now</Button>
            </Col>
          </Tab>
          <Tab eventKey={4} title="Expertize">
            <Col xsOffset={4} sm={4}>
              <img src={image} alt="profile image" style={{ height: 90, width: 120 }}/>
              <h2>{username}</h2>
              <div>{description}</div>
              Select your experience:
              <TagDropdown userId={user ? user.id : ''} client={client} addTags={this.addTags}/>
              <div>{value.map(tag => <div key={tag}><Label>{tag}</Label></div>)}</div>
              <div>What are you interested in?</div>
              {/* {tags.length > 0 ? tags.map(tag => <li key={tag}>{tag}</li>) : ''} */}
              <div>
                {user 
                ?
                  <Button type="submit" onClick={this.updateUserInfo}>
                    Update My Information
                  </Button>
                :
                  ''
                }
              </div>
            </Col>
          </Tab>
        </Tabs>
        :
        <div>Loading...</div>
      }
      </div>
    )
  }
};