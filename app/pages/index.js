import React from "react";
import Layout from "../components/Layout";

function Pages({ title, component }) {
  return (
    <div className="relative">      
      {/* Right Rectangle */}
      <div className="absolute top-0 right-0 w-16 h-full bg-blue-500"></div>

      <div className="p-4">
        <p className="text-2xl font-bold">{title}</p>
        <p className="text-lg">{component}</p>
      </div>
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
