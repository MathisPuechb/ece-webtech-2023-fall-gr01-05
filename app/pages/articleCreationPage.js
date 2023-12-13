// PostForm.js
import React, { useState } from "react";
import { supabase } from "./supabase-config";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useUser } from '../components/UserContext';

const PostForm = ({ onPostSubmit, onCancel }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useUser();
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

    // Save post to the database
    try {
      const { data, error } = await supabase.from("posts").insert([
        {
          title,
          content,
          user_id: user.id,
          created_at: new Date(),
        },
      ]);

      if (error) {
        console.error("Error saving post:", error.message);
      } else {
        // Notify parent component of successful submission
        onPostSubmit(data[0]);
      }
    } catch (error) {
      console.error("Error saving post:", error.message);
    }
  };

  return (
    <Layout>
      <div>
        <h2>Create a New Post</h2>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </Layout>
  );
};

export default PostForm;
