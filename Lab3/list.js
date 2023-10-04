const express = require('express');
const app = express();
const port = 3000; 

const db = require('./js'); 

app.get('/articles', (req, res) => {
  res.json(db.articles);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
