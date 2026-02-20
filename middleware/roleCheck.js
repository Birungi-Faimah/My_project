function requireRole(role) {
  return function (req, res, next) {
    // Debug logging
    console.log('Role Check - Required:', role);
    console.log('Role Check - isAuthenticated:', req.isAuthenticated ? req.isAuthenticated() : 'method not found');
    console.log('Role Check - User:', req.user ? { email: req.user.email, role: req.user.role } : 'no user');
    
    // Check if user is authenticated
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      console.log('Role Check - User not authenticated, redirecting to login');
      return res.redirect('/login');
    }
    
    // Check if user exists and has a role
    if (!req.user) {
      console.log('Role Check - No user in session');
      return res.redirect('/login');
    }
    
    // Check if user has the required role
    if (req.user.role === role) {
      console.log('Role Check - Access granted');
      return next();
    }
    
    // User has a different role - redirect to their appropriate dashboard
    console.log('Role Check - Wrong role. User role:', req.user.role, 'Required:', role);
    
    if (req.user.role === 'manager') {
      return res.redirect('/manager');
    } else if (req.user.role === 'director') {
      return res.redirect('/director');
    } else if (req.user.role === 'salesagent') {
      return res.redirect('/salesAgentDash');
    }
    
    // User has no valid role
    return res.status(403).send('Access denied. Your account does not have a valid role. Please contact administrator.');
  };
}

module.exports = requireRole; 