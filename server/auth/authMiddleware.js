var authMiddleware = function (req, res, next) {
  res.append('user', JSON.stringify(req.user));
  // res.append('userInfo', JSON.stringify(req.))
  next();
}

module.exports = authMiddleware;