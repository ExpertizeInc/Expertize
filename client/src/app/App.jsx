import React from "react";
import { ApolloProvider } from "react-apollo";
import Particles from "react-particles-js";
import params from "../particles.js";
import { Query } from 'react-apollo';
import { GET_USER_UID, CREATE_USER, UPDATE_USER_INFO } from "../apollo/gql.js";
import Footer from './Footer.jsx';
import Routes from "../routes/Routes.jsx";
import history from "./history.js";
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, authenticated: false, uid: null, isLoading: true };
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
    this.checkLinkedInUser = this.checkLinkedInUser.bind(this);
    this.checkFirebaseUser = this.checkFirebaseUser.bind(this);
    this.checkIfUserIsInDB = this.checkIfUserIsInDB.bind(this);
    this.firebaseSignIn = this.firebaseSignIn.bind(this);
  }

  UNSAFE_componentWillMount(nextProps, nextState) {
    localStorage.getItem('userId') && this.setState({ authenticated: true, uid: localStorage.getItem('user'), user: localStorage.getItem('userData'), isLoading: false})
  }

  componentDidMount() {
    var userId = localStorage.getItem('userId');
    var authType = localStorage.getItem('fbOrLi');
    console.log('TYPEOF', typeof userId)
    console.log('YES', userId, authType)
    if (userId !== null) {
      console.log('userid check???')
      this.checkIfUserIsInDB(userId);
    } else if (authType === 'firebase') {
      this.checkFirebaseUser();
    } else if (authType === 'linkedIn') {
      this.checkLinkedInUser();
    } else {
      console.log('didnt find anything')
      history.push('/signin')
    }
  }

  checkIfUserIsInDB(uid) {
    this.props.client
      .query({ query: GET_USER_UID, variables: { uid } })
        .then(({ data }) => {
          this.setState({ authenticated: true, user: data.user }, () => {
            localStorage.setItem('userId', uid);
            localStorage.setItem('fbOrLi', 'firebase');
            localStorage.setItem('timestamp', Date.now());
            // if (data.user.dailyClaimed === false) {
            //   show popup to let them claim 1 coin freebie 
            // }
            console.log('data.user', data.user)
            history.push('/home')
          })
        })
        .catch(err => console.error("auth failed", err));
  }

  checkFirebaseUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem('userId', user.uid);
        localStorage.setItem('fbOrLi', 'firebase');
        localStorage.setItem('timestamp', Date.now());
        this.props.client
          .query({ query: GET_USER_UID, variables: { uid: user.uid } })
          .then(({ data }) => {
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
      // console.log(res.headers)
      const user = JSON.parse(res.headers.user);
      console.log(user, 'PPP')
      if (user) {
        console.log(user)
        localStorage.setItem('userId', user.id);
        localStorage.setItem('fbOrLi', 'linkedIn');
        localStorage.setItem('timestamp', Date.now());
        // this.setState({ authenticated: true })
        this.props.client 
          .query({  query: GET_USER_UID, variables: { uid: user.id }})
            .then(({ data }) => {
              this.props.client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: data.user.id, online: true } })
                .then(({data}) => {
                  this.setState({ authenticated: true, user: data.user }, () => history.push('/home'))
                })
                .catch(err => console.error('Error in changing status', err));
            })
            .catch(() => {
              this.props.client
                .mutate({ mutation: CREATE_USER, variables: { uid: user.id , email: user._json.emailAddress, username: user._json.formattedName, linkedProfile: user._json.publicProfileUrl  }})
                .then(({data}) => this.setState({ authenticated: true, user: data.createUser}, () => history.push('/questionnaire')))
                .catch(e => history.push('/signin'))
            });
      } else {
        history.push('/signin');
      }
  })
  .catch(err => console.log('not signed in linkedIn', err))
  }

  signIn(user) {
    console.log('PPP', user);
    this.props.client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: data.user.id, online: true } })
    .then(({data}) => this.setState({ authenticated: true, user: data.createUser}, () => history.push('/questionnaire')))
    .catch(e => history.push('/signin'))
    localStorage.setItem('userId', user.uid || user.id);
    localStorage.setItem('fbOrLi', 'firebase');
    localStorage.setItem('timestamp', Date.now());
    console.log('ugh', user)
    this.setState({ authenticated: true, uid: user.uid, user }, () => history.push("/home"));
  }

  firebaseSignIn(e, email, password) {
    this.checkFirebaseUser();
    e.preventDefault();
    console.log('submitting sign in to firebase');
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({user}) => this.signIn(user))
      .catch(error => {
        console.error('error code:', error.code, 'with message: ', error.message);
      });  
  }

  signOut() {
    let authType = localStorage.getItem('fbOrLi');
    if (authType === 'firebase') {
      firebase.auth().signOut();
    } else if (authType === 'linkedIn') {
      axios.get('/logout')
        .then(() => history.push('/'))
        .catch(err => console.error('error in signout', err))
    }
    this.props.client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: this.state.user.id, online: false }})
      .then(({data}) => this.setState({ authenticated: false, user: null }, () => history.push('/')))
      .catch(err => console.error('error in sign out mutation', err));
    localStorage.setItem('user', null);
    localStorage.setItem('userId', null);
    localStorage.setItem('timestamp', null);
    localStorage.setItem('fbOrLi', null);
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
                if (loading) return <div></div>;
                if (error) return <div>{console.log(error)}</div>;
                return (
                  <div>
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
            fbSignIn={this.firebaseSignIn}
            client={this.props.client}
          />
        </ApolloProvider>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
