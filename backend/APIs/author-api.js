const express = require('express');
const authorapp = express.Router();
const bcrytpjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
authorapp.use(express.json());

let authorCollection;
let articlesCollection;
authorapp.use((req, res, next) => {
  authorCollection = req.app.get('authorCollection');
  articlesCollection = req.app.get('articlesCollection');
  next();
});

//get method
authorapp.get('/authors', async (req, res) => {
  let authorsList = await authorCollection.find().toArray();
  res.send({ message: 'your data', payload: authorsList });
});

//post method for resgister
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
//post method for login
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

//post method for article
authorapp.post('/article', async (req, res) => {
  const newArticle = req.body;
  await articlesCollection.insertOne(newArticle);

  res.send({ message: 'New Article added' });
});

//get metahod to read articles

authorapp.get('/article/:username', async (req, res) => {
  let authName = req.params.username;
  let artList = await articlesCollection.find({ username: authName }).toArray();

  res.send({ message: 'Articles', payload: artList });
});

//soft delete or change status of article
authorapp.put('/article/:username/:articleId', async (req, res) => {
  let artId = req.params.articleId;
  let currentstatus = req.body.status;

  if (currentstatus === true) {
    let removedArt = await articlesCollection.findOneAndUpdate(
      { articleId: artId },
      { $set: { status: true } },
      { returnDocument: 'after' }
    );
    res.send({ message: 'Article true', payload: removedArt });
  } else {
    let removedArt = await articlesCollection.findOneAndUpdate(
      { articleId: artId },
      { $set: { status: false } },
      { returnDocument: 'after' }
    );
    res.send({ message: 'Article false', payload: removedArt });
  }
});

//article edit

authorapp.put('/article', async (req, res) => {
  let modified = req.body;
  let artUpdate = await articlesCollection.findOneAndUpdate(
    { articleId: modified.articleId },
    { $set: { ...modified } },
    { returnDocument: 'after' }
  );

  res.send({ message: 'Updated', payload: artUpdate });
});
module.exports = authorapp;
