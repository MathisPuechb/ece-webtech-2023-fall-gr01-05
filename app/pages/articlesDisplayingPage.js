import React, { useEffect, useState } from "react";
import Link from "next/link"; // Import Link from Next.js
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
            {posts.map((post) => (
              <tr key={post.id_article} style={{ borderBottom: "1px solid #ddd" }}>
                {/* Use Link to wrap the title and provide the URL for the detailed view */}
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
