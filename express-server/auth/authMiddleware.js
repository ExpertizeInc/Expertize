var authMiddleware = function (req, res, next) {
  console.log('MIDDLEWARE', req.user)
  res.append('user', JSON.stringify(req.user));
  next();
}

module.exports = authMiddleware;