const express = require('express');
const Userapp = express.Router();
const bcrytpjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
Userapp.use(express.json());

let userCollection;
Userapp.use((req, res, next) => {
  userCollection = req.app.get('userCollection');
  next();
});

Userapp.get('/users', async (req, res) => {
  let usersList = await userCollection.find().toArray();
  res.send({ message: 'your data', payload: usersList });
});

Userapp.post('/register', async (req, res) => {
  let newUser = req.body;
  let dbUSer = await userCollection.findOne({
    username: newUser.username,
  });
  if (dbUSer !== null) {
    return res.send({ message: 'User already exists' });
  }
  let hashedPassword = await bcrytpjs.hash(newUser.password, 6);

  newUser.password = hashedPassword;
  await userCollection.insertOne(newUser);
  res.send({ message: 'New User created' });
});

Userapp.post('/login', async (req, res) => {
  //get authour credObj
  let userCred = req.body;
  let dbUser = await userCollection.findOne({
    username: userCred.username,
  });
  if (dbUser === null) {
    return res.send({ message: 'Invalid Username' });
  } else {
    let result = await bcrytpjs.compare(userCred.password, dbUser.password);
    if (result === false) {
      return res.send({ message: 'Invalid Password' });
    } else {
      //create token
      let singleToken = jwt.sign({ username: userCred.username }, 'abcedf', {
        expiresIn: 30,
      });
      res.send({
        message: 'Login Successful',
        token: singleToken,
        author: dbUser,
      });
    }
  }
});

module.exports = Userapp;
