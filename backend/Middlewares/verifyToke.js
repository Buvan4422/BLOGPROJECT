const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  let bearerToken = req.headers.authorization;
  console.log(bearerToken);
  if (bearerToken === undefined) {
    res.send({ message: 'Unauthorized user' });
  }
  let token = bearerToken.split(' ')[1];
  try {
    let decodedToken = jwt.verify(token, 'abcedf');
    console.log(decodedToken);
    next();
  } catch (err) {
    console.log(err);
    res.send({ message: err.messsage });
  }
};

module.exports = verifyToken;
