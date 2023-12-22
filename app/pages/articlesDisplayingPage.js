// PostListPage.js
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

    fetchPosts();console.log(" datas: ",posts);
  }, []);

  return (
    <Layout>
      <div>
        <h2>Posteeeee List</h2>
        <PostList posts={posts} />
      </div>
    </Layout>
  );
};

export default PostListPage;
