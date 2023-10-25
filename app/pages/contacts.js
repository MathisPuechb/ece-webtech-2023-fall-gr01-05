import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function ArticlesPage({ articles }) {
  return (
    <Layout>
      <div>
        <h1>Contact Us!</h1>
        <p>Phone: +235 564 456</p>
        <p>Location: Desert Island</p>
      </div>
    </Layout>
  );
}
