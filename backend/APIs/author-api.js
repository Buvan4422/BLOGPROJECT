const express = require('express');
const authorapp = express.Router();
const bcrytpjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
authorapp.use(express.json());

let authorCollection;
authorapp.use((req, res, next) => {
  authorCollection = req.app.get('authorCollection');
  next();
});

//get method
authorapp.get('/authors', async (req, res) => {
  let authorsList = await authorCollection.find().toArray();
  res.send({ message: 'your data', payload: authorsList });
});

//post method
authorapp.post('/register', async (req, res) => {
  let newAuthor = req.body;
  let dbAuthor = await authorCollection.findOne({
    username: newAuthor.username,
  });
  if (dbAuthor !== null) {
    return res.send({ message: 'Author already exists' });
  }
  let hashedPassword = await bcrytpjs.hash(newAuthor.password, 6);

  newAuthor.password = hashedPassword;
  await authorCollection.insertOne(newAuthor);
  res.send({ message: 'New author  created' });
});

authorapp.post('/login', async (req, res) => {
  //get authour credObj
  let authCred = req.body;
  let dbAuthor = await authorCollection.findOne({
    username: authCred.username,
  });
  if (dbAuthor === null) {
    return res.send({ message: 'Invalid Username' });
  } else {
    let result = await bcrytpjs.compare(authCred.password, dbAuthor.password);
    if (result === false) {
      return res.send({ message: 'Invalid Password' });
    } else {
      //create token
      let singleToken = jwt.sign({ username: authCred.username }, 'abcedf', {
        expiresIn: 30,
      });
      res.send({
        message: 'Login Successful',
        token: singleToken,
        author: dbAuthor,
      });
    }
  }
});

//put method

module.exports = authorapp;
