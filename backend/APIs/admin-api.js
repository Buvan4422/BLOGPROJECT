const express = require('express');
const adminapp = express.Router();
adminapp.use(express.json());

adminapp.get('/test-admin', (req, res) => {
  res.send('From admin api');
});

module.exports = adminapp;
