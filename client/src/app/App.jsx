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
    this.checkLinkedInUser = this.checkLinkedInUser.bind(this);
    this.checkFirebaseUser = this.checkFirebaseUser.bind(this);
    this.checkIfUserIsInDB = this.checkIfUserIsInDB.bind(this);
    this.firebaseSignIn = this.firebaseSignIn.bind(this);
  }

  UNSAFE_componentWillMount(nextProps, nextState) {
    localStorage.getItem('userId') && this.setState({ authenticated: true, uid: localStorage.getItem('userId'), isLoading: false})
  }

  componentDidMount() {
    var userId = JSON.stringify(localStorage.getItem('userId'));
    var authType = JSON.stringify(localStorage.getItem('fbOrLi'));
    var signInType = JSON.stringify(localStorage.getItem('linkedInLoginType'));
    console.log(userId, 'userID');
    console.log(authType === '"linkedIn"', 'AUTHTYPE')
    console.log(signInType === '"signIn"', 'signInType')
    if (userId !== '"null"' && signInType !== '"signUp"') {
      this.checkIfUserIsInDB(JSON.stringify(userId));
    } else if (authType === '"firebase"') {
      this.checkFirebaseUser();
    } else if (authType === '"linkedIn"') {
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

  checkLinkedInUser() {
    // e.preventDefault()
    const check = localStorage.getItem('linkedInLoginType');

    console.log('CHECK', JSON.stringify(check))
    if (JSON.stringify(check) === 'signIn') {
      axios.post('/users')
      .then((res) => {
        console.log('YYYYY', res.headers)
        localStorage.setItem('signingIn', 'false');
        const user = JSON.parse(res.headers.user);
        if (user !== "undefined") {
          localStorage.setItem('userId', user.id);
          localStorage.setItem('fbOrLi', 'linkedIn');
          localStorage.setItem('timestamp', Date.now());
          this.props.client.query({ query: GET_USER_UID, variables: { uid: user.id }})
            .then(({ data }) => {
              console.log(data, 'XXXXXPP')
              localStorage.setItem('signingIn', 'false');
              this.setState({ authenticated: true})
              this.props.client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: data.user.id, online: true } })
                .then(({data}) => {
                  console.log('data', data)
                  this.setState({ user: data.updateUser, uid: data.updateUser.uid }, () => {
                    history.push('/home')
                  })
                })
                .catch(err => console.error('Error in changing status', err));
            })
            .catch(() => history.push('/signup'));
        } else if (JSON.stringify(check) === 'signUp') {
          axios.post('/users')
            .then((res) => {
              const user = JSON.parse(res.headers.user);
              console.log('YYYYYY', user)
              if (user !== "undefined") {
                localStorage.setItem('userId', user.id);
                localStorage.setItem('fbOrLi', 'linkedIn')
                this.props.client.mutate({ mutation: CREATE_USER, variables: { uid: user.id, email: user._json.emailAddress, username: user._json.formattedName  } })
                  .then(({ data }) => {
                    console.log('UUUU', data)
                    localStorage.setItem('signingIn', 'false');
                    this.props.client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: data.user.id, online: true, image: user._json.pictureUrl, linkedInProfile: user._json.publicProfileUrl  } })
                      .then(({data}) => {
                        console.log('user', data)
                        this.setState({ authenticated: true, user: data.updateUser }, () => {
                          history.push('/home')
                        })
                      })
                      .catch(err => console.error('Error in changing status', err));
                  })
                  .catch(() => {
                    localStorage.clear();
                    history.push('/signup')}
                    );
              } else {
                localStorage.clear();
                history.push('/')
              }
          })
          .catch(err => console.log('not signed in linkedIn', err))
      }
    }).catch(e => console.error('FUCK', e));
}
}

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
          .catch(() => history.push('/signup'));
      } else {
        this.setState({ authenticated: false }, () => {
          localStorage.clear();
          history.push('/');
        }) ;
      }
    });
  }

  signOut() {
    const { user } = this.state;
    let authType = localStorage.getItem('fbOrLi');
    if (authType === 'firebase') {
      firebase.auth().signOut();
      localStorage.clear();
      this.setState({ authenticated: false, user: null}, () =>  history.push('/'))
    } else {
      axios.get('/logout')
        .then(() => {
          localStorage.clear();
          this.setState({ authenticated: false, user: null, uid: null}, () => history.push('/'))
        })
        .catch(() => {
          localStorage.clear();
          history.push('/')}
          )
    }
    this.props.client.mutate({ mutation: UPDATE_USER_INFO, variables: { id: user.id , online: false }})
      .then(() => this.setState({ authenticated: false, user: null }, () => history.push('/')))
      .catch(err => console.error('error in sign out mutation', err));

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
            client={client}
          />
        </ApolloProvider>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
