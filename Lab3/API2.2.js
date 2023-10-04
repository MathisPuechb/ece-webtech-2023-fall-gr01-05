const express = require('express');
const app = express();

let articles = []; 

// Route to list all articles
app.get('/articles', (req, res) => {
  res.json(articles);
});

// Route to add a new article
app.post('/articles', (req, res) => {
  const newArticle = req.body; 
  articles.push(newArticle);
  res.json({ message: 'Article added successfully', article: newArticle });
});

// Route to get an article by ID
app.get('/articles/:articleId', (req, res) => {
  const articleId = req.params.articleId;
  const article = articles.find(article => article.id === articleId);
  
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
