import React from "react";
import { ApolloProvider } from "react-apollo";
import { Query } from 'react-apollo';
import { GET_USER_UID, CREATE_USER, UPDATE_USER_INFO } from "../apollo/gql.js";
import Footer from './Footer.jsx';
import Routes from "../routes/Routes.jsx";
import history from "./history.js";
import axios from 'axios';
// import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, authenticated: false, uid: null, isLoading: true };
    this.signOut = this.signOut.bind(this);
    this.checkLinkedInUser = this.checkLinkedInUser.bind(this);
    this.checkFirebaseUser = this.checkFirebaseUser.bind(this);
    this.checkIfUserIsInDB = this.checkIfUserIsInDB.bind(this);
    this.firebaseSignIn = this.firebaseSignIn.bind(this);
  }

  UNSAFE_componentWillMount(nextProps, nextState) {
    localStorage.getItem('userId') && this.setState({ authenticated: true, uid: localStorage.getItem('userId'), isLoading: false})
  }

  componentDidMount() {
    var userId = localStorage.getItem('userId');
    var authType = localStorage.getItem('fbOrLi');
    var signInType = localStorage.getItem('loginType');
    console.log(signInType == 'signUp')
    console.log(authType, 'authType')
    if (JSON.stringify(userId) !== 'null' || userId !== null && signInType != 'signUp') {
      this.checkIfUserIsInDB(userId);
    } else if (authType === 'firebase' && signInType != 'signUp') {
      this.checkFirebaseUser();
    } else if (authType === 'linkedIn' && signInType != 'signUp') {
      this.checkLinkedInUser();
    } else {
      console.log('XXX')
    }
  }

  checkIfUserIsInDB(uid) {
    const { client } = this.props;
    client.query({ query: GET_USER_UID, variables: { uid } })
      .then(({ data }) => {
        console.log(data)
        this.setState({ authenticated: true, user: data.user, uid }, () => {
          localStorage.setItem('userId', uid);
          localStorage.setItem('fbOrLi', 'firebase');
          localStorage.setItem('timestamp', Date.now());
          history.push('/home')
        })
      })
      .catch(() => history.push('/signup'));
  }

  checkLinkedInUser() {
    const { client } = this.props;
    axios.post('/users')
    .then((res) => {
      const user = JSON.parse(res.headers.user);
      if (user) {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('fbOrLi', 'linkedIn');
        localStorage.setItem('timestamp', Date.now());
        localStorage.setItem('loginType', null)
        client.query({  query: GET_USER_UID, variables: { uid: user.id }})
          .then(({ data }) => {
            client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: data.user.id, online: true, image: user._json.pictureUrl, linkedInProfile: user._json.publicProfileUrl } })
              .then(({data}) => this.setState({ authenticated: true, user: data.updateUser, uid: data.updateUser.uid }, () => history.push('/home')))
              .catch(err => console.error('Error in changing status', err));
          })
          .catch(() => {
            client.mutate({ mutation: CREATE_USER, variables: { uid: user.id , email: user._json.emailAddress, username: user._json.formattedName  }})
              .then(({data}) => {
                client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: data.user.id, online: true, image: user._json.pictureUrl, linkedInProfile: user._json.publicProfileUrl } })
                  .then(({data}) => this.setState({ authenticated: true, user: data.user, uid: data.user.uid }, () => history.push('/home')))
                  .catch(err => console.error('Error in changing status', err));
              })
              .catch(e => history.push('/signin'))
          });
      } else {
        history.push('/signin');
      }
  })
  .catch(err => console.log('not signed in linkedIn', err))
  }

  firebaseSignIn(e, email, password) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.checkFirebaseUser())
      .catch(error => console.error('error code:', error.code, 'with message: ', error.message));  
  }
  checkFirebaseUser() {
   const { client } = this.props;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        client.query({ query: GET_USER_UID, variables: { uid: user.uid } })
          .then(({ data }) => {
            localStorage.setItem('userId', data.user.uid);
            localStorage.setItem('loginType', null)
              client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: data.user.id, online: true } })
                .then(({data}) => this.setState({ authenticated: true, user: data.updateUser, uid: data.updateUser.uid }, () => history.push('/home')))
                .catch(e => history.push('/signin'))
          })
          .catch(() => history.push('/signup'));
      } else {
        this.setState({ authenticated: false }, () => {
          localStorage.clear();
          history.push('/');
        });
      }
    });
  }

  signUpFirebaseUser(email, password) {
    const { client } = this.props;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        client.mutate({ mutation: CREATE_USER, variables: { uid: user.uid, email, username }})
        .then(({ data }) => {
            localStorage.setItem('userId', data.user.uid);
            localStorage.setItem('loginType', null);
              client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: data.user.id, online: true } })
                .then(({data}) => { console.log(data, "DATA")
                this.setState({ authenticated: true, user: data.updateUser, uid: data.updateUser.uid }, () => history.push('/questionnaire'))})
                .catch(e => history.push('/signup'))
          })
          .catch(() => history.push('/signup'));
      })
      .catch(() => history.push('/signup'))
  }



  signOut() {
    const { user } = this.state;
    const { client } = this.props;
    let authType = localStorage.getItem('fbOrLi');
    if (authType === 'firebase') {
      firebase.auth().signOut();
      localStorage.clear();
      client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: user.id , online: false }})
        .then(() => this.setState({ authenticated: false, user: null, uid: null }, () => history.push('/')))
        .catch(err => console.error('error in sign out mutation', err));
    } else {
      axios.get('/logout')
        .then(() => {
          localStorage.clear();
          client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: user.id , online: false }})
            .then(() => this.setState({ authenticated: false, user: null, uid: null }, () => history.push('/')))
            .catch(err => console.error('error in sign out mutation', err));
        })
        .catch(() => {
          localStorage.clear();
          history.push('/');
        })
    }
  }

  render() {
    const { user, authenticated, uid } = this.state;
    const { client } = this.props;
    return (
      <React.Fragment>
        <div className="main">
        <ApolloProvider client={client}>
        {(authenticated && user) && 
            <Query query={ GET_USER_UID } variables={{ uid }} >
              {({ loading, error, data, refetch, networkStatus }) => {
                if (loading) return <div></div>;
                if (error) return <div>{console.log(error)}</div>;
                return (
                  <div />
                );
              }}
            </Query>}
          <Routes
            history={history}
            user={user}
            signOut={this.signOut}
            authenticated={authenticated}
            history={history}
            linkedInSignIn={this.checkLinkedInUser}
            fbSignIn={this.firebaseSignIn}
            checkIfUserIsInDB={this.signUpFirebaseUser}
            client={client}
          />
        </ApolloProvider>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
