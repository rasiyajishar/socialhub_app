const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new Error("No valid token provided");
    }

    const token = authorizationHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) {
        console.error('Token verification failed:', err.message);
        return res.status(403).json({ msg: 'Invalid or expired token' });
      } else {
        req.user = data;
        console.log('Token verified. User:', data);
        next();
      }
    });
  } catch (error) {
    console.error('Error in token verification middleware:', error.message);
    return res.status(401).json({ msg: 'Unauthorized' });
  }
};

module.exports = verifyToken;
