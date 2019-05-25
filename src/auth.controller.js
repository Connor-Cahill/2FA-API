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


/**
 * SignUp takes in inputted credential from request body
 * and creates a new user / stores in database
 */
const SignUp = async (req, res) => {
    // create new user with request body data
    const user = new User(req.body);
    // encrypt users password before saved
    user.password = user.generateHash(req.body.password);
    await user.save();
    // issue cookie
    // will return Status 200 if successful
    return IssueToken(user, res);
}
