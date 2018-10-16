import React from "react";
import { ApolloProvider } from "react-apollo";
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
    // this.signIn = this.signIn.bind(this);
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
    var signingIn = localStorage.getItem('signingIn');
    if (userId !== 'null') {
      this.checkIfUserIsInDB(userId);
    } else if (authType === 'firebase') {
      this.checkFirebaseUser();
    } else if (authType === 'linkedIn') {
      this.checkLinkedInUser();
    } else {
      
    }
  }

  checkIfUserIsInDB(uid) {
    this.props.client.query({ query: GET_USER_UID, variables: { uid } })
        .then(({ data }) => {
          console.log(data)
          this.setState({ authenticated: true, user: data.user, uid }, () => {
            localStorage.setItem('userId', uid);
            localStorage.setItem('fbOrLi', 'firebase');
            localStorage.setItem('timestamp', Date.now());
            history.push('/home')
          })
        })
        .catch(err => history.push('/signin'));
  }

  checkLinkedInUser(e) {
    // e.preventDefault();
    const check = localStorage.getItem('linkedInLoginType');
    if (check === 'signIn') {
      axios.post('/users')
      .then((res) => {
        console.log('USSS', res)
        const user = JSON.parse(res.headers.user);
        if (user !== "undefined") {
          localStorage.setItem('userId', user.id);
          localStorage.setItem('fbOrLi', 'linkedIn');
          localStorage.setItem('userId', user.id)
          this.props.client.query({ query: GET_USER_UID, variables: { uid: user.id }})
            .then(({ data }) => {
              localStorage.setItem('signingIn', 'false');
              this.props.client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: data.user.id, online: true } })
                .then(({data}) => {
                  this.setState({ authenticated: true, user: data.updateUser, uid: data.updateUser.uid }, () => {
                    history.push('/home')
                  })
                })
                .catch(err => console.error('Error in changing status', err));
            })
            .catch(() => {
              history.push('/signup')
            });
        } else {
          axios.post('/users')
            .then((res) => {
              console.log(res.headers, 'XXX')
              const user = JSON.parse(res.headers.user);
              if (user !== "undefined") {
                localStorage.setItem('userId', user.id);
                localStorage.setItem('fbOrLi', 'linkedIn')
                localStorage.setItem('userId', user.uid);
                this.props.client.mutate({ mutation: CREATE_USER, variables: { uid: user.id, email: user._json.emailAddress, username: user._json.formattedName  } })
                  .then(({ data }) => {
                    console.log('UUUU', data)
                    localStorage.setItem('signingIn', 'false');
                    this.props.client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: data.user.id, online: true } })
                      .then(({data}) => {
                        this.setState({ authenticated: true, user: data.updateUser }, () => {
                          history.push('/home')
                        })
                      })
                      .catch(err => console.error('Error in changing status', err));
                  })
                  .catch(() => history.push('/signup'));
              } else {
                console.log('YYYY')
              }
          })
          .catch(err => console.log('not signed in linkedIn', err))
      }
    }).catch(e => console.error('FUCK', e));
}
}
  // signIn(user) {
  //   console.log('YES', user)
    
  //   this.props.client.mutate({ mutation: CREATE_USER, variables: { uid: user.uid, email: user._json.emailAddress, username: user._json.formattedName  } })
  //     .then(({data}) => this.setState({ authenticated: true, user: data.createUser, uid: data.createUser.uid }, () => history.push('/questionnaire')))
  //     .catch(e => history.push('/signin'))
  //   localStorage.setItem('userId', user.uid || user.id);
  //   localStorage.setItem('fbOrLi', 'firebase');
  //   localStorage.setItem('timestamp', Date.now());
  //   this.setState({ authenticated: true, uid: user.uid || user.id, user }, () => history.push("/home"));
  // }

  firebaseSignIn(e, email, password) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.checkFirebaseUser())
      .catch(error => console.error('error code:', error.code, 'with message: ', error.message));  
  }
  checkFirebaseUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.client.query({ query: GET_USER_UID, variables: { uid: user.uid } })
          .then(({ data }) => {
            localStorage.setItem('userId', data.user.uid);
              this.props.client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: data.user.id, online: true } })
                .then(({data}) => this.setState({ authenticated: true, user: data.updateUser, uid: data.updateUser.uid }, () => history.push('/home')))
                .catch(e => history.push('/signin'))
          })
          .catch(err => history.push('/signup'));
      } else {
        this.setState({ authenticated: false });
      }
    });
  }

  signOut() {
    let authType = localStorage.getItem('fbOrLi');
    if (authType === 'firebase') {
      firebase.auth().signOut();
      localStorage.setItem('userId', null);
      localStorage.setItem('timestamp', null);
      localStorage.setItem('fbOrLi', null);
      localStorage.setItem('user', null);
      localStorage.setItem('linkedInLoginType', null)
      this.setState({ authenticated: false, user: null}, () =>  history.push('/'))
    } else {
      axios.get('/logout')
        .then(() => {
          localStorage.setItem('userId', null);
          localStorage.setItem('user', null);
          localStorage.setItem('timestamp', null);
          localStorage.setItem('fbOrLi', null);
          localStorage.setItem('signingIn', null);
          localStorage.setItem('linkedInLoginType', null);
          this.setState({ authenticated: false, user: null, uid: null}, () => history.push('/'))
        })
        .catch(err => history.push('/'))
    }
    this.props.client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: this.state.user.id, online: false }})
      .then(() => this.setState({ authenticated: false, user: null }, () => history.push('/')))
      .catch(err => console.error('error in sign out mutation', err));

  }

  render() {
    const { user, authenticated, uid } = this.state;
    return (
      <React.Fragment>
        <div className="main">
        <ApolloProvider client={this.props.client}>
        {(authenticated && user) && 
            <Query query={ GET_USER_UID } variables={{ uid }} >
              {({ loading, error, data, refetch, networkStatus }) => {
                if (loading) return <div></div>;
                if (error) return <div>{console.log(error)}</div>;
                return (
                  <div>
                    {/* {this.setState({ user: data.user })} */}
                  </div>
                );
              }}
            </Query>}
          <Routes
            history={history}
            user={user}
            // signIn={this.signIn}
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
