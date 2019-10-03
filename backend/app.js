
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Post = require('./models/post');
const moongoose = require('mongoose');
const postsRoutes = require('./routes/posts');

moongoose.connect('mongodb+srv://chinnu:1234@chinmay-keoor.mongodb.net/test?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  .then(() => {
    console.log('Connected to Database');
  })
  .catch(() => {
    console.log('Connection Failed');
  })

;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  next();

});

app.use('/api/posts', postsRoutes);
module.exports = app;
