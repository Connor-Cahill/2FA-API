const express = require('express');
const controller = require('./auth.controller');
// TODO: get middleware for Async Error Handling

const router = express.Router();

// POST: route signs up new user
router.post('/sign-up', controller.SignUp);

// POST: route signs in existing user
router.post('/sign-in', controller.SignIn);


// GET: logs out a user by clearing JWT token
router.get('/sign-out', controller.SignOut);

module.exports = router;
