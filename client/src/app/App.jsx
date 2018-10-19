import React from "react";
import { ApolloProvider } from "react-apollo";
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
    this.signUpFirebaseUser = this.signUpFirebaseUser.bind(this);
  }

  UNSAFE_componentWillMount(nextProps, nextState) {
    localStorage.getItem('userId') && this.setState({ authenticated: true, uid: localStorage.getItem('userId'), isLoading: false})
  }

  componentDidMount() {
    var userId = localStorage.getItem('userId');
    var authType = localStorage.getItem('fbOrLi');
    var loginType = localStorage.getItem('loginType');
    // console.log('loginType', loginType);
    // console.log('userId', userId);
    // console.log('authType', authType)
    if (JSON.stringify(userId) !== 'null' || userId !== null || loginType != 'signUp') {
      this.checkIfUserIsInDB(userId);
    } else if (authType === 'firebase' && loginType != 'signUp') {
      this.checkFirebaseUser();
    } else if (authType === 'linkedIn' && loginType != 'signUp') {
      this.checkLinkedInUser();
    } else if (authType === 'linkedIn' && loginType == 'signIn') {
      this.checkLinkedInUser();
    } else if (authType === 'firebase' && loginType == 'signIn') {
      this.checkFirebaseUser();
    } else {
      // console.log('HERERERER')
    }
  }

  checkIfUserIsInDB(uid) {
    // console.log('XXX', uid)
    const { client } = this.props; 
    client.query({ query: GET_USER_UID, variables: { uid } })
      .then(({ data }) => {
        // console.log('data', data)
        this.setState({ authenticated: true, user: data.user, uid }, () => {
          localStorage.setItem('userId', uid);
          localStorage.setItem('timestamp', Date.now());
          localStorage.setItem('loginType', null);
          history.push('/home')
        })
      })
      .catch(() => history.push('/signup'));
  }

  checkLinkedInUser() {
    const { client } = this.props;
    if (localStorage.getItem('loginType') == 'signIn') {
      axios.post('/users').then((res) => {
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
            .catch(() => history.push('/signin'))
        }
      }).catch(() => history.push('/signin'))
    } else if (localStorage.getItem('loginType') == 'signUp') {
        axios.post('/users')
        .then((res) => {
          const user = JSON.parse(res.headers.user);
          if (user) {
            localStorage.setItem('userId', user.id);
            localStorage.setItem('fbOrLi', 'linkedIn');
            localStorage.setItem('timestamp', Date.now());
            localStorage.setItem('loginType', null)
            client.mutate({ mutation: CREATE_USER, variables: { uid: user.id , email: user._json.emailAddress, username: user._json.formattedName  }})
            .then(({data}) => {
              client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: data.user.id, online: true, image: user._json.pictureUrl, linkedInProfile: user._json.publicProfileUrl } })
                .then(({data}) => this.setState({ authenticated: true, user: data.user, uid: data.user.uid }, () => history.push('/questionnaire')))
                .catch(err => console.error('Error in changing status', err));
            })
            .catch(e => history.push('/signin'))
          }
        })
      }
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

  signUpFirebaseUser(e, email, password, username) {
    const { client } = this.props;
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        client.mutate({ mutation: CREATE_USER, variables: { uid: user.uid, email, username }})
        .then(({ data }) => {
            localStorage.setItem('userId', data.createUser.id);
            localStorage.setItem('loginType', null);
              client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: data.createUser.id, online: true } })
                .then(({data}) => { 
                  localStorage.setItem('userId', data.updateUser.id);
                  this.setState({ authenticated: true, user: data.updateUser, uid: data.updateUser.uid }, () => history.push('/questionnaire'))
                })
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
    // console.log('LOCAL', localStorage.getItem('userId'))
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
    const { user, authenticated } = this.state;
    const { client } = this.props;
    const styleSplash = { backgroundImage: "url('https://i.gifer.com/F1hh.gif')", opacity: .8, backgroundColor: "#000"}
    const style = {backgroundColor: "#333"}
    return (
      <React.Fragment>
        <div className="main fit" style={authenticated ? style : styleSplash}>
          <ApolloProvider client={client}>
            <Routes
              history={history}
              user={user}
              signOut={this.signOut}
              authenticated={authenticated}
              history={history}
              linkedInSignIn={this.checkLinkedInUser}
              fbSignIn={this.firebaseSignIn}
              addFirebaseUser={this.signUpFirebaseUser}
              client={client}
            />
          </ApolloProvider>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
