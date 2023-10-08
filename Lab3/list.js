const express = require('express');
const app = express();
const port = 8080;

const articles = require('./articles'); // Importez les données depuis articles.js

app.get('/', (req, res) => {
  res.json(articles); // Afficher les articles à la racine
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
