const articles = [
  {
    id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
    title: 'My article',
    content: 'Content of the article.',
    date: '04/10/2022',
    author: 'Liz Gringer'
  },
  {
    id: '01234',
    title: 'article 1',
    content: 'Content of the article.',
    date: '04/10/2023',
    author: 'Nicolas Bouissou'
  },
  // 
];

const comments = [
  {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    timestamp: 1664835049,
    content: 'Content of the comment.',
    articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
    author: 'Bob McLaren'
  },
  {
    id: '9876',
    timestamp: 2987371938,
    content: 'Content of the comment.',
    articleId: '01234',
    author: 'Bob McLaren george'
  },
  // 
];

module.exports = {
  articles,
  comments
};
