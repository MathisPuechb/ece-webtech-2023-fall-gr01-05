// Import necessary dependencies and components
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout"; // Import the layout component
import PostDetail from "../../components/articleDetails"; // Assuming this is a component to display post details
import CommentSection from "../../components/comments"; // Import the CommentSection component
import { useSupabaseClient } from '@supabase/auth-helpers-react'; // Import Supabase authentication helper

// Define the functional component for the post detail page
const PostDetailPage = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { articleID } = router.query; // Extract post ID from the URL query parameters
  const [post, setPost] = useState(null); // State for storing post data
  const [comments, setComments] = useState([]); // State for storing comments data

  // useEffect hook to fetch post and comments when the component mounts or articleID changes
  useEffect(() => {
    // Function to fetch the specific post from the database and update state
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id_article", articleID)
          .single();

        if (error) {
          console.error("Error fetching post:", error.message);
        } else {
          setPost(data); // Update the post state with the fetched data
        }
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };

    // Function to fetch comments associated with the post and update state
    const fetchComments = async () => {
      try {
        const { data, error } = await supabase
          .from("comments")
          .select("*")
          .eq("post_id", articleID);

        if (error) {
          console.error("Error fetching comments:", error.message);
        } else {
          setComments(data); // Update the comments state with the fetched data
        }
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    // Check if articleID is available and then fetch the post and comments
    if (articleID) {
      fetchPost();
      fetchComments();
    }
  }, [articleID]);

  // JSX for rendering the component
  return (
    <Layout>
      <div>
        {/* Display the PostDetail component with the fetched post data or a loading message */}
        {post ? <PostDetail post={post} /> : <p>Loading...</p>}
        {/* Render the CommentSection component with comments and post ID */}
        <CommentSection comments={comments} postId={articleID} />
      </div>
    </Layout>
  );
};

export default PostDetailPage; // Export the PostDetailPage component
