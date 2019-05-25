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


/**
 * SignIn will check inputted credentials against users
 * in database and if user exists with correct
 * credentials returns JWT Token to say authenticated
 */
const SignIn = async (req, res) => {
  // find user by email
  const user = await User.findOne({ email: req.body.email }).exec();
  // if there is no user, user doesnt exist yet
  if (!user) {
    // TODO: how to handle this?
    // eslint-disable-next-line no-console
    console.log('Email or password incorrect.');
    return res.sendStatus(401);
  } else if (!user.comparePassword(req.body.password)) {
    // eslint-disable-next-line no-console
    console.log('Email or password incorrect.');
    return res.sendStatus(401);
  } else {
    // inputted credentials are correct, issue token
    return IssueToken(user, res);
  }
}

/**
 * SignOut removes JWT token from cookies 
 * logging user out
 */
const SignOut = async () => {
    // removes cookie logging user out
    res.clearCookie(process.env.COOKIE);
    return res.sendStatus(200);
}


module.exports = {
    SignIn,
    SignUp,
    SignOut,
}
