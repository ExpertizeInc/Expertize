import React from "react";
import { ApolloProvider } from "react-apollo";
import Particles from "react-particles-js";
import params from "../particles.js";
import { Query } from 'react-apollo';
import { GET_USER_UID } from "../apollo/gql.js";
import Footer from './Footer.jsx';
import Routes from "../routes/Routes.jsx";
import history from "./history.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, authenticated: false, uid: null };
    this.callbackFunction = this.callbackFunction.bind(this);
    this.signInLI = this.signInLI.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // this.props.client
        //   .query({ query: GET_USER_UID, variables: { uid: user.uid }, notifyOnNetworkStatusChange: true })
        //   .then(({ data }) => {
        //     this.setState({ authenticated: true, user: data.user }, () => {
        //     })}
        //   )
        //   .catch(err => console.error("auth faied", err));
        this.setState({ authenticated: true, uid: user.uid })
      } else {
        this.setState({ authenticated: false });
      }
    });

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
    IN.API.Raw(
      "/people/~:(id,firstName,lastName,emailAddress,location,industry)?format=json"
    )
      // this.setState({authenticated: true},
      .result(results => console.log("results in linkedIn", results))
      .error(error => console.error("error in linkedIn", error));
    IN.API.Raw("/industries?format=json")
      .result(results => console.log("results in.api.raw", results))
      .error(error => console.error("error in in.api.raw", error));
  }

  signInLI(e, a) {
    e.preventDefault();
    console.log("LINKED IN");
    IN.User.authorize(this.callbackFunction, "");
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
                  {console.log('????', data)}
                    {this.setState({ user: data.user })}
                  </div>

                );
              }}

            </Query>}
          <Routes
            user={user}
            signIn={this.signIn}
            authenticated={authenticated}
            signInLI={this.signInLI}
            signOut={this.signOut}
          />
        </ApolloProvider>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
