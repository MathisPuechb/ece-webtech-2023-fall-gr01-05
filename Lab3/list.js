const express = require('express');
const app = express();
const bodyParser =  require('body-parser');
const port = 8080;

const articles = require('./articles'); 

app.use(bodyParser.urlencoded({
  extended: false}))
  
app.get('/', (req, res) => {
  res.json(articles); 
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.post('/articles', (req, res) => {
  
  const { title, content, date, author } = req.body;
  

  const nvarticle = {
    id: '1235646', 
    title: 'How to push an article',
    content: 'Good content',
    date:'08/10/2035',
    author:'Us',
  };
 
  articles.articles.push(nvarticle);
  res.status(201).json(nvarticle);

  
});
