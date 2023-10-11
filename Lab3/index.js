const express = require('express');
const app = express();
const port = 8080;
const searchId = '123456789'
const articles = require('./articles');
const article = articles.articles.find( article => article.id === searchId)
// returns an element of an array or `undefined`


app.get('/id', (req,res) => {
  res.json(article);
})


app.get('/', (req, res) => {
  res.json(articles);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.post('/articles', (req, res) => {
 
  const { id, title, content, date, author } = req.body;
 

  const nvarticle = {
    id: '123564667',
    title: 'How to push an article',
    content: 'Good content',
    date:'08/10/2035',
    author:'Us',
  };
 
  articles.articles.push(nvarticle);
  res.status(201).json(nvarticle);

 
});