const express = require('express');
const app = express();
const port = 8080;
const articles = require('./data/articlesList');
const searchId = '123456789';

app.get('/article/:searchId', (req, res) => {
  const article = articles.articles.find(article => article.id === req.params.searchId);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

app.get('/article/:searchId/comments', (req, res) => {
  const article = articles.articles.find(article => article.id === req.params.searchId);
  if (article) {
    const comments = articles.comments.filter(comment => comment.articleId === req.params.searchId);
    res.json(comments);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

app.get('/article/:articleId/comments/:commentId', (req, res) => {
  const articleId = req.params.articleId;
  const commentId = req.params.commentId;

  // Find the article with the specified articleId
  const article = articles.articles.find(article => article.id === articleId);

  if (!article) {
    return res.status(404).json({ message: 'Article not found' });
  }

  // Find the comment with the specified commentId within the article's comments
  const comment = articles.comments.find(comment => comment.id === commentId);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  res.json(comment);
});

app.get('/articles', (req, res) => {
  res.json(articles);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());

app.post('/articles', (req, res) => {
  const { id, title, content, date, author } = req.body;

  const newArticle = {
    id: '123564667',
    title: 'How to push an article',
    content: 'Good content',
    date: '08/10/2035',
    author: 'Us',
  };

  articles.articles.push(newArticle);
  res.status(201).json(newArticle);
});