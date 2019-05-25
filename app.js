const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

// setup express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// setup mongoose and mongodb stuff
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
// throws error if no mongod runnin
mongoose.conntection.on('error', console.error.bind(console, 'MongoDB Connection Error: '));
mongoose.Promise = global.Promise;


// start server to list on port 3000 or PORT .env var
app.listen(process.env.PORT || 3000, () => console.log('App listening on 3000.'));
