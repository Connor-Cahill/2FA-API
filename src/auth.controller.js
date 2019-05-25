const User = require('./user.model');
const jwt = require('jsonwebtoken');


/**
 * IssueToken is called once user is authenticated
 * and returns a JWT token
 */
const IssueToken = (user, res) => {
  const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
  res.cookie(process.env.COOKIE, token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true }); // maxAge set to 24 hours
  return res.sendStatus(200);
}


