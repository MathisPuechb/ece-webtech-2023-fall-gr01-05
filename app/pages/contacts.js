import React from "react";
import Layout from "../components/Layout";
function Pages({ title, component }) {
  return (
    <div className="bg-gray-100 p-4">
      <p className="wt-title">{title}</p>
      <p className="text-lg">{component}</p>

      <div className="mt-4">
        <p className="text-lg">Phone: +33 6 45 98 52 65</p>
        <p className="text-lg">Address: Desert Island</p>
        <p className="text-lg">Email: <a href="mailto:eatcat@miawmiaw.com">eatcat@miawmiaw.com</a></p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Layout>
      <Pages title="Contact Us !" component="------------------" />
    </Layout>
  );
}
