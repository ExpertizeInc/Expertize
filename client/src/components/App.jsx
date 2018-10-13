import React from "react";
import { ApolloProvider } from "react-apollo";
import Particles from "react-particles-js";
import params from "../particles.js";
import { GET_USER_UID, CREATE_USER } from "../gql.js";
import Routes from "../Routes.jsx";
import history from "../components/history.js";
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, authenticated: false, linkedInUserName: '', linkedInEmail: '', linkedInId: '', linkedInImage: '', linkedInHeadline: '', linkedInUrl: ''  };
    // this.callbackFunction = this.callbackFunction.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    if (this.state.user === null) {
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
    if (this.state.user !== null) {
      axios.post('/users')
      .then((res) => {
      var user = JSON.parse(res.headers.user);
      // console.log(user);
      if (user) {
        console.log('XXX', user)
        this.props.client 
            .query({  query: GET_USER_UID, variables: { uid: user.id }})
            .then(({ data }) => {
              console.log('DATA', data)
              this.setState({ authenticated: true, user: data.user }, () => {
                history.push('/home')
              })
            })
              .catch(() => {
                this.props.client
                  .mutate({ mutation: CREATE_USER, variables: { uid: user.id , email: user._json.emailAddress, username: user._json.formattedName }})
                    .then(({data}) => {
                      console.log("PPPPPP", data.createUser)
                      this.setState({ authenticated: true, user: data.createUser}, (user) => history.push('/questionnaire'))
                    })
                    .catch(e => console.error('FUCK', e))
              })
      } else {
         history.push('/login');
      }
    })
    .catch(e => console.error('FAILED', e))
    }
  }

  signIn(user) {
    this.setState({ authenticated: true, user }, () => history.push("/home"));
  }

  signOut() {
    this.setState({ authenticated: false }, () => console.log("toggled authenticated"));
  }

  render() {
    const { user, authenticated } = this.state;
    return (
      <div>
        <ApolloProvider client={this.props.client} mutate={this.props.mutate}>
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
          <Routes
            user={user}
            signIn={this.signIn}
            authenticated={authenticated}
            signOut={this.signOut}
            LIResults={this.state.LIResults}
          />
        </ApolloProvider>
      </div>
    );
  }
}
