
require('dotenv').config();
const express = require('express');
const APIRoutes = require('./routes/api');
const session = require('express-session');
const app = express();
const authRoutes = require('./routes/authorization');


const PORT = process.env.port || 3000;

app.use(session({
  secret: process.env.SESSION_SECRET || 'TEMPSECRET',
  resave: false,
  saveUninitialized: false
}));

app.get('/', (req, res) => {
  console.info('root was called!');
  res.json({message : "The backend says hello! I'm kind of the ass around here"});
});

app.use(authRoutes.router);
app.use('/api', APIRoutes);

app.get('/userTest', (req, res) => {
  console.log(JSON.stringify(authRoutes.user));
  res.end();
});

app.listen(PORT, _=> {
    console.log(`server started @ port: ${PORT}`);
});