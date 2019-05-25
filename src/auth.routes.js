const express = require('express');
const controller = require('./auth.controller');
// express async handler wrapping promises in catch statements
const wrap  = require('express-async-handler');

const router = express.Router();

// POST: route signs up new user
router.post('/sign-up', wrap(controller.SignUp));

// POST: route signs in existing user
router.post('/sign-in', wrap(controller.SignIn));

// GET: logs out a user by clearing JWT token
router.get('/sign-out', wrap(controller.SignOut));

module.exports = router;
