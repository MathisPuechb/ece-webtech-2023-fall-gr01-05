const express = require('express');
const app = express();
const port = 8080;

const articles = require('./articles'); 

app.get('/', (req, res) => {
  res.json(articles); 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
