const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
const DB_CONNECT_MSG = 'MongoDB connected'
let web_msg = 'duck'
mongoose
  .connect(db)
  .then(() => {
    console.log(DB_CONNECT_MSG);
    web_msg = 'I am God'
  })
  .catch(err => console.log(Error(err)));

app.get('/', (req, res) => res.send(web_msg));

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(
  `Server running on port ${port}`
));