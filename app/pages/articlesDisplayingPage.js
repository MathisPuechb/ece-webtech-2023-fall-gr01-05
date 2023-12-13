// PostListPage.js
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PostList from "./PostList";
import { supabase } from "./supabase-config";

const PostListPage = () => {
  const [posts, setPosts] = useState([]);

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
        <PostList posts={posts} />
      </div>
    </Layout>
  );
};

export default PostListPage;
