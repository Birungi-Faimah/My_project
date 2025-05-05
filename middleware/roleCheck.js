function requireRole(role) {
  return function (req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated() && req.user && req.user.role === role) {
      return next();
    }
    return res.status(403).send('Access denied.');
  };
}

module.exports = requireRole; 