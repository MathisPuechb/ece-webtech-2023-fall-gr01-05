import React from "react";
import Layout from "../components/Layout";

function Pages({ title, component }) {
  return (
    <div>
      <p className="text-2xl font-bold">{title}</p>
      <p className="text-lg">{component}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <Layout>
      <div className="bg-gray-100 p-4">
        <Pages title="Home Page" component="Welcome to our website" />
      </div>
    </Layout>
  );
}
