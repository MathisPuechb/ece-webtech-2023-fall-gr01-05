import React from "react"
import Layout from "../components/Layout"
import listArticles from "./articlesList"

function Pages ({title, component}){

  return (
    <div>
      <p>
        {title}
      </p>
      <p>
        {component}
      </p>

    </div>
  );
}


export default function homePage (){
return (
  <Layout>
    {}
    < Pages title= "contact page" component="about us"/> 
  </Layout>
);
}