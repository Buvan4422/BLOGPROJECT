const express = require('express');
const authorapp = express.Router();
const bcrytpjs = require('bcryptjs');
authorapp.use(express.json());

let authorCollection;

authorapp.use((req, res, next) => {
  authorCollection = req.app.get('authorCollection');
  next();
});
authorapp.get('/authors', async (req, res) => {
  let authorsList = await authorCollection.find().toArray();
  res.send({ message: 'your data', payload: authorsList });
});

authorapp.post('/register', async (req, res) => {
  let newAuthor = req.body;
  let hashedPassword = await bcrytpjs.hash(newAuthor.password, 6);

  newAuthor.password = hashedPassword;
  await authorCollection.insertOne(newAuthor);
  res.send({ message: 'New author  created' });
});

authorapp.put('/update/:username', async (req, res) => {
  let uname = req.params.username;
  let updateData = req.body;
  // Checking for password updates
  if ('password' in updateData) {
    updateData.password = await bcrytpjs.hash(updateData.password, 6);
  } else {
    delete updateData.password;
  }
  const result = await authorCollection.updateOne(
    { name: uname },
    { $set: updateData }
  );
  res.send({ message: 'author updated' });
});

module.exports = authorapp;
