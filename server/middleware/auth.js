const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ✅ 1. Check for 'Bearer' token format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Strip 'Bearer '

  try {
    // ✅ 2. Verify token using your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ 3. Set the user info on request object
    req.user = decoded;

    // ✅ 4. Proceed to the next middleware
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(403).json({ msg: 'Token is not valid' });
  }
};
