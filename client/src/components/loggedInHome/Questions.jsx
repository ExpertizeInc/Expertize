import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel, Panel } from 'react-bootstrap'
import gql from "graphql-tag";



const createQuestion = gql`
  mutation CreateQuestion($userId: String!, $description: String!, $tag: String!, $chat: ChatType!, $coins: Int!, $title: String!) {
    createQuestion(userId: $userId, description: $description, tag: $tag, chat: $chat, coins: $coins, title: $title) {
      userId
      description
      tag
      chat
      coins
      title
    }
  }
`

const getQuestions = gql`
  query {
    questions{
      userId
      description
      tag
      chat
      active
      coins
      title
    }
  }
`

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = { description: '', userId: '123', tag: '', chat: 'VIDEO', title: '', questions: [] };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e, type) {
    e.preventDefault()
    this.setState({
      [type]: e.target.value
    })
  }

  render() {
    return (
      <Form className="form-panel-signup" horizontal>
        <h2>Post a Question</h2>
        
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={5}>
            Password
          </Col>
          <Col sm={3}>
            <FormControl password={this.state.title} onChange={(e) => this.onChange(e, 'title')} type="Title" placeholder="Enter Title" />
          </Col>
        </FormGroup>
        
        <FormGroup controlId="formHorizontalUsername">
          <Col componentClass={ControlLabel} sm={5}>
            Question Name
          </Col>
          <Col sm={3}>
            <FormControl value={this.state.name} onChange={(e) => this.onChange(e, 'name')} type="Name" placeholder="Name" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalUsername">
          <Col componentClass={ControlLabel} sm={5}>
            Username
          </Col>
          <Col sm={3}>
            <FormControl value={this.state.description} onChange={(e) => this.onChange(e, 'description')} type="Description" placeholder="Description" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={5}>
            Email
          </Col>
          <Col sm={3}>
            <FormControl value={this.state.tag} onChange={(e) => this.onChange(e, 'tag')} type="tag" placeholder="Enter Tag" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={6} sm={3}>
          {/* todo: hook up to firebase/linkedin Oauth */}

          <Mutation mutation={createQuestion} variables={{ userId: 'cjmtrhw9c1v1g0b44h33anq7u', description: this.state.description, tag: this.state.tag, chat: 'VIDEO', coins: 3, title: this.state.title }} onCompleted={(data) => console.log(data)}>
            {(createQuestion, { data }) => {
              console.log(data) 
              return (
              <Button onClick={createQuestion}>Create Question</Button>
              )}}
            </Mutation>
          </Col>
          <br /><br/><br/>
          <Query query={getQuestions}>
          {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>
                    // if (data) this.setState({ questions: data.questions })
                    return (
                    <div>
                        {console.log(data)}
                        {data.questions.map((question, i) => (
                          <div key={i}>
                            <Panel>
                              <Panel.Heading>
                                <Panel.Title componentClass="h3">Title: {question.title}  Coins: {question.coins} Tag: {question.tag} Active: {question.active.toString()} Chat Type: {question.chat}</Panel.Title>
                              </Panel.Heading>
                              <Panel.Body>{question.description}</Panel.Body>
                            </Panel>
                          </div>
                        ))}
                    </div>
                    )
                }}
          </Query>

        </FormGroup>
      </Form>
    )
  }
}