import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleList from '../data/articlesList'

const Articles = () => {
  return (
    <div>
      <Header />
      <h1>Articles Page</h1>
      <ArticleList />
      <Footer />
    </div>
  );
};

export default Articles;