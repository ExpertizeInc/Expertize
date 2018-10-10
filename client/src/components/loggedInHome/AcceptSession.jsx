import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo';
import { Modal, Button } from 'react-bootstrap';
import { GET_UNACCEPTED_SESSIONS, UPDATE_SESSION } from '../../gql.js';



export default class AcceptSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    }
  }

  componentDidMount() {
    // app experiencing breaking bug with subscriptions
    // preemptively implementing live query to compensate

    // if (this.state.show) {
    //   console.log('done')
    // } else {
    //   this.interval = setInterval(() => this.setState({ toggle: !this.state.toggle }), 5000)
    // }
  }


  render() {
    let { user, showNotification, hideNotification, show } = this.props
    return (
      <div>
        Hello?
        <Modal show={show} >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>User has accepted your question</h4>
            <p>
              Would you like to accept?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => hideNotification()}>Accept</Button>
            <Mutation mutation={UPDATE_SESSION} variables={{ accepted: false }}>
            {updateSession => (
            <Button onClick={() => {
              hideNotification()
              updateSession()
            }}>Reject</Button>
            )}
            </Mutation>
          </Modal.Footer>
        </Modal>
        {/* {!show && <Query query={GET_UNACCEPTED_SESSIONS} variables={{ username: user.username }} pollInterval={5000}>
          {({ loading, error, data, startPolling, stopPolling }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error</div>
            return (
              <div>
                {showNotification()}
                {stopPolling()}
                {console.log(data)}
              </div>
            )
          }}
        </Query>} */}
      </div>
    );
  }
}
 