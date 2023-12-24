// PostDetailPage.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import PostDetail from "../../components/articleDetails";
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const PostDetailPage = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const postId = router.query; // Assuming you're using Next.js routing with query parameters
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the specific post from the database and update state
    const fetchPost = async () => {
      try {
        console.log("uuid: ",postId);
        const { data, error } = await supabase.from("posts").select("*").eq("id_article", postId.articleID).single();
        console.log("data: ", data);
        if (error) {
          console.error("Error fetching post:", error.message);
        } else {
          setPost(data);
        }
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };
   
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  return (
    <Layout>
      <div>
        {post ? <PostDetail post={post} /> : <p>Loading...</p>}
      </div>
    </Layout>
  );
};

export default PostDetailPage;
