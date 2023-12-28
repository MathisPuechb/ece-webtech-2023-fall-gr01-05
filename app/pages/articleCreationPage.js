// Import necessary dependencies and components
import React, { useState } from "react";
import Layout from "@/components/Layout"; // Import the layout component
import { useRouter } from "next/router"; // Import the Next.js router
import { useUser } from "@/components/UserContext"; // Import the UserContext for user information
import { useSupabaseClient } from "@supabase/auth-helpers-react"; // Import Supabase authentication helper
import { v4 as uuidv4 } from "uuid"; // Import the function for generating UUIDs

// Define the PostForm functional component
const PostForm = ({ onPostSubmit, onCancel }) => {
  const router = useRouter();
  const { user } = useUser(); // Use the user context hook to get user information
  const supabase = useSupabaseClient(); // Supabase client instance for data interactions
  const [title, setTitle] = useState(""); // State for the post title
  const [content, setContent] = useState(""); // State for the post content

  // Function to generate a random UUID for post ID
  const generateRandomId = () => {
    return uuidv4(); // Generate a random UUID
  };

  // Function to handle saving the post to the database
  const handleSave = async () => {
    // Check if the user is logged in
    if (!user) {
      // Redirect to the login page or show a message
      router.push("/");
      return;
    }

    // Validate form fields
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required");
      return;
    }

    const id_article = generateRandomId(); // Generate a random post ID
    

    // Save post to the database
    
      const { error } = await supabase.from("posts").insert([
        {
          id_article,
          title,
          content,
          user_id: user.id,
          created_at: new Date(),
        },
      ]);

      if (error) {
        console.error("Error saving post:", error.message);
      } else {
        
        // Notify the parent component of successful submission
        
        router.push(`/articlesDisplayingPage`);
      }
    
  };

  // JSX for rendering the component
  return (
    <Layout>
      {/* Post form container */}
      <center>
        <div className="post-form-container">
          <h2>Create a New Post</h2>
          {/* Title input */}
          <div className="form-group">
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          {/* Content textarea */}
          <div className="form-group">
            <label>Content:</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          {/* Form actions (Post and Cancel buttons) */}
          <div className="form-actions">
            {/* Post button */}
            <button className="btn-blue" onClick={handleSave}>
              POST
            </button>
            <br></br><br></br>
            {/* Cancel button */}
            <button className="btn-red" onClick={onCancel}>
              CANCEL
            </button>
          </div>
        </div>
      </center>

      {/* Styling using styled-jsx */}
      <style jsx>{`
        .post-form-container {
          margin: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

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

export default PostForm; // Export the PostForm component
