// Import necessary dependencies and components
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout"; // layout component
import Link from 'next/link'; // Import the Link component
import { useSupabaseClient } from '@supabase/auth-helpers-react'; // Supabase authentication 
import { useRouter } from "next/router";

// Define the PostListPage functional component
const PostListPage = () => {
  // State variables for managing posts, search, and post editing
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editPostId, setEditPostId] = useState(null);
  
  // Supabase client instance and Next.js router
  const supabase = useSupabaseClient();
  const router = useRouter();

  // useEffect hook to fetch posts when the component mounts
  useEffect(() => {
    // Function to fetch posts asynchronously
    const fetchPosts = async () => {
      try {
        // Query Supabase for posts, order them by creation date
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) {
          console.error("Error fetching posts:", error.message);
        } else {
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    // Call the fetchPosts function when the component mounts
    fetchPosts();
  }, []);

  // Function to handle search based on the entered query
  const handleSearch = () => {
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setPosts(filteredPosts);
  };

  // Function to reset search and fetch all posts again
  const resetSearch = async () => {
    setSearchQuery("");
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching posts:", error.message);
    } else {
      setPosts(data);
    }
  };

  // Function to handle initiating post edit
  const handleEdit = (postId, content) => {
    setEditPostId(postId);
    setEditContent(content);
  };

  // Function to save the edited post
  const handleSaveEdit = async () => {
    try {
      // Find the current post being edited
      const currentPost = posts.find((post) => post.id_article === editPostId);

      // If the post is not found, log an error and return
      if (!currentPost) {
        console.error("Post not found for editing");
        return;
      }

      // Create an updated post object with the edited content
      const updatedPost = {
        id_article: currentPost.id_article,
        title: currentPost.title, 
        content: editContent,
        user_id: currentPost.user_id, 
        created_at: currentPost.created_at, 
      };

      // Update the post in the Supabase database
      const { error } = await supabase.from("posts").upsert([updatedPost]);

      // If there's an error, throw it
      if (error) {
        throw error;
      }

      // Update the local state with the edited post
      const updatedPosts = posts.map((post) =>
        post.id_article === editPostId ? { ...post, content: editContent } : post
      );

      setPosts(updatedPosts);

      // Reset edit state
      setEditPostId(null);
      setEditContent("");
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  // JSX for rendering the component
  return (
    <Layout>
      {/* Main content container */}
      <div>
        <br />
        {/* Search input and buttons */}
        <div style={{ marginBottom: "16px" }}>
          <center>
            <input
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {' '}
            <button className="btn-blue" onClick={handleSearch}> Search</button>
            {' '}
            <button className="btn-red" onClick={resetSearch}> Reset</button>
          </center>
        </div>
        {/* Table to display posts */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          {/* Table header */}
          <thead>
            <tr>
              <th style={tableCellStyle}>Title</th>
              <th style={tableCellStyle}>Content</th>
              <th style={tableCellStyle}>Action</th>
            </tr>
          </thead>
          {/* Table body with posts */}
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id_article} style={{ borderBottom: "1px solid #ddd", background: index % 2 === 0 ? "#f9f9f9" : "transparent" }}>
                {/* Post title with Link to individual post page */}
                <td style={tableCellStyle}>
                  <Link href={`/articles/${post.id_article}`} passHref>
                    <div>{post.title}</div>
                  </Link>
                </td>
                {/* Post content or editable input */}
                <td style={tableCellStyle}>
                  {editPostId === post.id_article ? (
                    <input
                      type="text"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                  ) : (
                    post.content
                  )}
                </td>
                {/* Edit or save button based on edit state */}
                <td style={tableCellStyle}>
                  {editPostId === post.id_article ? (
                    <button onClick={handleSaveEdit}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(post.id_article, post.content)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Styling using styled-jsx */}
      <style jsx>{`
        .btn-blue {
          background-color: #3490dc;
          color: #fff;
        }

        .btn-red {
          background-color: #e53e3e;
          color: #fff;
        }
      `}</style>
    </Layout>
  );
};

// Inline style for table cell
const tableCellStyle = {
  padding: "8px",
  borderBottom: "1px solid #ddd",
};

// Export the PostListPage component
export default PostListPage;
