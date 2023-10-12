import React from "react"
import Layout from "../components/Layout"

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
    < Pages title= "about page" component="about our cats" /> 
  </Layout>
);
}