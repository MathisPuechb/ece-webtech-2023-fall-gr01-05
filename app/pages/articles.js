import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import articles from "../lib/articlesList";

function Pages({ title, component, articles }) {
  return (
    <div>
      <p>{title}</p>
      <p>{component}</p>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <p className="wt-title">
              <Link href={`/articles/${article.id}`}>Title: {article.title}</Link>
              </p>
            <p>Author: {article.author}</p>
            <p>Date: {article.date}</p>
            <p>Content: {article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function homePage() {
  return (
    <Layout>
      <Pages title="Articles Page" component="List of Our Articles" articles={articles} />
    </Layout>
  );
}
