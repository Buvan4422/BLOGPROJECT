const exp = require('express');
const app = exp();
const users = require('./APIs/user-api');
const authors = require('./APIs/author-api');
const admins = require('./APIs/admin-api');

const port = 4000;
app.listen(port, console.log(`Server listening at http://localhost:${port}`));

app.use(exp.json());

const mongoClient = require('mongodb').MongoClient;

mongoClient
  .connect('mongodb://localhost:27017')
  .then((client) => {
    const dbObj = client.db('blogapp');
    const userCollection = dbObj.collection('users');
    const authorCollection = dbObj.collection('authors');
    const articlesCollection = dbObj.collection('articles');

    app.set('userCollection', userCollection);
    app.set('authorCollection', authorCollection);
    app.set('articlesCollection', articlesCollection);
  })
  .catch();

app.use('/user-api', users);
app.use('/author-api', authors);
app.use('/admin-api', admins);
