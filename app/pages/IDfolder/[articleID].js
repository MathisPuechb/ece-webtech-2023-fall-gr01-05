import React from "react";
import Layout from "../../components/Layout";
import articles from "../articlesList";
import { useRouter } from 'next/router';

function Article ({ title, author, date }) {
  return (
    <div>
      <p>Title: {title}</p>
      <p>Author: {author}</p>
      <p>Date: {date}</p>
    </div>
  );
}

export default function ArticleID() {
  const router = useRouter()

  const { articleID } = router.query;

  const article = articles.find(article => article.id === articleID);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <Layout>
      <Article 
        title={article.title}
        author={article.author}
        date={article.date}
      />
    </Layout>
  );
}