const express = require('express');
const Userapp = express.Router();
Userapp.use(express.json());

let userCollections;
Userapp.use((req, res, next) => {
  userCollections = req.app.get('userCollections');
  next();
});

Userapp.get('/test-user', (req, res) => {
  res.send('From user api');
});
module.exports = Userapp;
