import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PostList from "../components/articleList";
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const supabase = useSupabaseClient();
  
  useEffect(() => {
    // Fetch posts from the database and update state
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

  return (
    <Layout>
      <div>
        <h2>Post List</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Title</strong></td>
              <td><strong>Content</strong></td>
            </tr>
            {posts.map((post) => (
              <tr key={post.id_article} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "8px" }}>{post.title}</td>
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
