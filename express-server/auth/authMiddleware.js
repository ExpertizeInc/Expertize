var authMiddleware = function (req, res, next) {
  res.append('user', JSON.stringify(req.user));
  next();
}

module.exports = authMiddleware;