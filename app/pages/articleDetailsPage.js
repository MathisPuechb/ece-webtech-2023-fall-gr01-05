// Import necessary dependencies and components
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import the Next.js router
import Layout from "../components/Layout"; // Import the layout component
import PostDetail from "../components/articleDetails"; // component to display post details
import { useSupabaseClient } from "@supabase/auth-helpers-react"; // Import Supabase authentication helper

// Define the functional component for the post detail page
const PostDetailPage = () => {
  // Access the Next.js router to get the post ID from the URL
  const router = useRouter();
  const postId = router.query.id; // Extract post ID from the URL query parameters
  const [post, setPost] = useState(null); // State to store the fetched post
  const supabase = useSupabaseClient(); // Supabase client instance for data fetching

  // useEffect hook to fetch and update the post when the component mounts or postId changes
  useEffect(() => {
    // Fetch the specific post from the database and update state
    const fetchPost = async () => {
      try {
        // Use Supabase client to query for the post with the given ID
        const { data, error } = await supabase.from("posts").select("*").eq("id_article", postId).single();
        if (error) {
          console.error("Error fetching post:", error.message);
        } else {
          setPost(data); // Update the post state with the fetched data
        }
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };

    // Check if postId is available and then fetch the post
    if (postId) {
      fetchPost();
    }
  }, [postId]); // Dependency array ensures this effect runs when postId changes

  // JSX for rendering the component
  return (
    <Layout>
      <div>
        {/* Display the PostDetail component with the fetched post data or a loading message */}
        {post ? <PostDetail post={post} /> : <p>Loading...</p>}
      </div>
    </Layout>
  );
};

export default PostDetailPage; // Export the PostDetailPage component
