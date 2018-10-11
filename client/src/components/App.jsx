import React from "react";
import { ApolloProvider } from "react-apollo";
import Particles from "react-particles-js";
import params from "../particles.js";
import { GET_USER_UID } from "../gql.js";
import Routes from "../Routes.jsx";
import history from "../components/history.js";
import axios from 'axios';
// import dotenv from 'dotenv';
import jsonp from 'jsonp';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, authenticated: false, LIResults: {} };
    this.callbackFunction = this.callbackFunction.bind(this);
    this.signInLI = this.signInLI.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.client
          .query({ query: GET_USER_UID, variables: { uid: user.uid } })
          .then(({ data }) =>
            this.setState({ authenticated: true, user: data.user })
          )
          .catch(err => console.error("auth faied", err));
      } else {
        this.setState({ authenticated: false });
      }
    });

    if (window.location.href.search) {
      console.log('XXXX', window.location)
      let x = window.location.search.slice(6);
      // x.slice(x.length, 9);
      // remove state from here!
      console.log('PPPP', x)
      axios.get('/linkedin', { params: {url: `http://www.linkedin.com/oauth/v2/accessToken/grant_type=authorization_code&code=${window.location.search.slice(6)}redirect_uri=https%3A%2F%2Flocalhost:3001.com%2F&client_id=77jrp4h9m6f6yf&client_secret=TQyMsJWbwxSuBpum`}})
      // axios.post(`http://www.linkedin.com/oauth/v2/accessToken/grant_type=authorization_code&code=${window.location.search.slice(6)}redirect_uri=https%3A%2F%2Flocalhost:3001.com%2F&client_id=123456789&client_secret=shhdonottell`)
        .then(data => console.log('FINAL', data))
        .catch(err => console.error('FUCKING FINAL ERROR', err))
        

    }
    // IN.Event.on(IN, 'auth', () => this.setState({authenticated:true}, () => console.log('detected user login',IN.User)), this)
    // IN.Event.on(IN, 'logout', () => this.setState({authorization:false}, () => console.log('logged out')), this)
    // if (IN.User.isAuthorized()) {
    //   console.log('in.user',IN.User.isAuthorized())
    //   this.setState({
    //     authenticated: true
    //   }, () => console.log('li user is logged in'))
    // } else {
    //   console.log('no linkedin user signed in')
    // }
  }

  signIn(user) {
    this.setState({ authenticated: true, user }, () => history.push("/home"));
  }

  callbackFunction() {
    IN.API.Raw("/people/~:(id,first-name,last-name,emailAddress,headline,picture-url,industry,positions:(id,title,summary,start-date,end-date,is-current,company:(id,name,type,size,industry,ticker)),educations:(id,school-name,field-of-study,start-date,end-date,degree,activities,notes))?format=json")
    // this.setState({authenticated: true}, 
    .result((results) => {
      console.log('results in linkedIn', results);
      this.setState({ LIResults: results }, () => {
        history.push('/questionnaire');
      })
        // client.mutate({
        //   mutation: createLinkedInUser,
        //   variables: {
        //     linkedInId: results.id,
        //     linkedInEmail: results.emailAddress,
        //   },
        // })
        // .then(() => {
        //   this.setState({ answerContent: '' });
        //   this.props.data.refetch();
        // })
    })
    .error((error) => console.error('error in linkedIn', error));
  }

  signInLI(e, a) {
    e.preventDefault();

    // axios.get('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77jrp4h9m6f6yf&redirect_uri=http%3A%2F%2Flocalhost:3001%2Fsignin&state=987654321')
    // .then((data) => {
    //   // res.send(data);
    //   console.log('GOOD', data)
    // })
    // .catch((err) => console.error('err from linkedIn', err));
    // console.log("LINKED IN");
    jsonp('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77jrp4h9m6f6yf&redirect_uri=http%3A%2F%2Flocalhost:3001%2Fsignin&state=987654321', null, (err, data) => {
      if (err) {
        console.error('FUCK', err)
      } else {
        console.log('YAY', data)
      }
    });
    // IN.User.authorize(this.callbackFunction);
    // a.history.push('/restricted')
  }

  signOut() {
    this.setState({ authenticated: false }, () =>
      console.log("toggled authenticated")
    );
  }

  render() {
    const { user, authenticated } = this.state;
    return (
      <div>
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
          <Routes
            user={user}
            signIn={this.signIn}
            authenticated={authenticated}
            signInLI={this.signInLI}
            signOut={this.signOut}
            LIResults={this.state.LIResults}
          />
        </ApolloProvider>
      </div>
    );
  }
}
