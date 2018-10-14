import React from "react";
import { ApolloProvider } from "react-apollo";
// import Particles from "react-particles-js";
// import params from "../particles.js";
import { Query } from 'react-apollo';
import { GET_USER_UID } from "../apollo/gql.js";
import Footer from './Footer.jsx';
import Routes from "../routes/Routes.jsx";
import history from "./history.js";
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, authenticated: false, uid: null };
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
    this.checkLinkedInUser = this.checkLinkedInUser.bind(this);
    this.checkFirebaseUser = this.checkFirebaseUser.bind(this);
  }

  componentDidMount() {
    this.checkFirebaseUser();
    // this.checkLinkedInUser();
  }

  checkFirebaseUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.client
          .query({ query: GET_USER_UID, variables: { uid: user.uid } })
          .then(({ data }) => {
          console.log(data.user, 'p')
            this.setState({ authenticated: true, user: data.user }, () => {
              // if (data.user.dailyClaimed === false) {
              //   show popup to let them claim 1 coin freebie 
              // }
              history.push('/home')
            })
          })
          .catch(err => console.error("auth failed", err));
      } else {
        this.setState({ authenticated: false });
      }
    });
  }

  checkLinkedInUser() {
    axios.post('/users')
    .then((res) => {
    var user = JSON.parse(res.headers.user);
    if (user) {
      this.props.client 
        .query({  query: GET_USER_UID, variables: { uid: user.id }})
          .then(({ data }) => this.setState({ authenticated: true, user: data.user }, () => history.push('/home')))
          .catch(() => {
            this.props.client
              .mutate({ mutation: CREATE_USER, variables: { uid: user.id , email: user._json.emailAddress, username: user._json.formattedName }})
              .then(({data}) => this.setState({ authenticated: true, user: data.createUser}, () => history.push('/questionnaire')))
              .catch(e => history.push('/login'))
          });
    } else {
      history.push('/login');
    }
  })
  .catch(err => console.log('not signed in linkedIn', err))
  }

  signIn(user) {
    this.setState({ authenticated: true, user }, () => history.push("/home"));
  }

  signOut() {
    this.setState({ authenticated: false, user: null }, () => history.push('/'));
  }

  render() {
    const { user, authenticated } = this.state;
    return (
      <React.Fragment>
        <div className="main">
        <ApolloProvider client={this.props.client}>
          {/* particles is buggy, but might fix later during refinement phase */}
          {/* <Particles params={params} style={{
          position: 'absolute',
          display: 'block',
          zIndex: -10,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('http://www.sompaisoscatalans.cat/simage/96/965205/black-gradient-wallpaper.png')"
          // backgroundImage: "url('https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/moving-through-stars-in-space_-1zccenlb__F0000.png')"
        }} /> */}
        {(authenticated && !user) && 
            <Query query={ GET_USER_UID } variables={{ uid: this.state.uid }} >
              {({ loading, error, data, refetch, networkStatus }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error{console.log(error)}</div>;
                return (
                  <div>
                    Ok
                  {/* {console.log('????', data)} */}
                    {this.setState({ user: data.user })}
                  </div>
                );
              }}
            </Query>}
          <Routes
            history={history}
            user={user}
            signIn={this.signIn}
            signOut={this.signOut}
            authenticated={authenticated}
            history={history}
            authenticateLinkedInUser={this.checkLinkedInUser}
          />
        </ApolloProvider>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
