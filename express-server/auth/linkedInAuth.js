const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const OauthParams = require('./OauthParams.js');
require('dotenv');

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
  console.log(req.user, 'BALLS')
  process.nextTick(() => {
    return done(null, profile);
  });
}));

module.exports = passport;