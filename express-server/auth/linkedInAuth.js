const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const OauthParams = require('./OauthParams.js');
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user)
});
passport.deserializeUser((id, done) => {
  done(null, id);
});

passport.use(new LinkedInStrategy({
  clientID: OauthParams.client_id,
  clientSecret: OauthParams.client_secret,
  callbackURL: OauthParams.redirect_uri,
  scope: ['r_emailaddress', 'r_basicprofile'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  // asynchronous verification, for effect...
  // console.log(req.user, 'BALLS')
  process.nextTick(() => {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}));

module.exports = passport;