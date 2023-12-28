//  const jwt = require("jsonwebtoken")

// const verifyToken = (req, res, next) => {
//     if (!req.headers.authorization) {
//       return res.status(401).json({ msg: 'Not authorized, no token' });
//     }
  
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//       const token = req.headers.authorization.split(' ')[1];
  
//       jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
//         if (err) {
//           return res.status(403).json({ msg: 'Invalid or expired token' });
//         } else {
//           req.user = data; // data = { id: user._id }
//           next();
//         }
//       });
//     }
//   };
  
// module.exports = verifyToken


const jwt = require("jsonwebtoken")
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    if (!token) {
      throw new Error('No token provided');
    }

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
    console.error('Error in token verification middleware:', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};
module.exports = verifyToken