const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token format' });
  }

  const tokenWithoutBearer = token.slice(7);

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
