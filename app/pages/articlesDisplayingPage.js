import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
        if (error) {
          console.error("Error fetching posts:", error.message);
        } else {
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = () => {
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setPosts(filteredPosts);
  };

  const resetSearch = async () => {
    setSearchQuery('');
    const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching posts:", error.message);
    } else {
      setPosts(data);
    }
  };

  return (
    <Layout>
      <div>
        <h2>Post List</h2>
        <div style={{ marginBottom: "16px" }}><center>
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={resetSearch}>  Reset</button></center>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id_article} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "8px" }}>
                  <Link href={`/articles/${post.id_article}`}>
                    <p>{post.title}</p>
                  </Link>
                </td>
                <td style={{ padding: "8px" }}>{post.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default PostListPage;
