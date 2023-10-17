import Layout from "../../components/Layout";
import articles from "../../lib/articlesList";
import { useRouter } from 'next/router';

export default function ArticleID() {
  const router = useRouter()
  const { articleID } = router.query;
  const article = articles.find(article => article.id === articleID);

  return (
    <Layout>
      {article
        ? (
          <div>
            <p>Title: {article.title}</p>
            <p>Author: {article.author}</p>
            <p>Date: {article.date}</p>
          </div>
        )
        : (
          <div>Article not found</div>
        )
      }
    </Layout>
  );
}
