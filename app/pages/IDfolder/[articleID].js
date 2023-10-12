import React from "react"
import Layout from "../../components/Layout"
import articles from "../articlesList"
import { useRouter } from 'next/router'

function Pages ({title, component, articles}) {
  return (
    <div>
      <p>{title}</p>
      <p>{component}</p>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <p>Title: {article.title}</p>
            <p>Author: {article.author}</p>
            <p>Date: {article.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ArticleID() {
  const router = useRouter()

  const { articleID } = router.query;

  const article = articles.find(article => article.id === articleID);

  return (
    <Layout>
      <Pages 
        title="Article Page" 
        component="Desired Article" 
        articles={[article]}
      />
    </Layout>
  );
}