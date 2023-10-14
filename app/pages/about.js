import React from "react";
import Layout from "../components/Layout";

function Pages({ title, component }) {
  return (
    <div className="bg-gray-100 p-4">
      <p className="wt-title">{title}</p>
      <p className="text-lg">{component}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <Layout>
      <Pages title="About Page" component="About our cats" />
    </Layout>
  );
}
