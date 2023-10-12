import React from "react"
import Layout from "../components/Layout"
import articles from "./articlesList"

function Pages ({title, component, articles}){

    return (
      <div>
        <p>
          {title}
        </p>
        <p>
          {component}
        </p>
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
  
  
  export default function homePage (){
    return (
      <Layout>
        <Pages 
          title="Articles Page" 
          component="List of Our Articles" 
          articles={articles} 
        />
      </Layout>
    );
  }