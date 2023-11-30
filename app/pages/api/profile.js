// Import Supabase client
import { createClient } from '@supabase/supabase-js';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
// Replace with your Supabase project URL and public key
const supabase = createClient('https://idmodaabicwombmjqcyk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbW9kYWFiaWN3b21ibWpxY3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwNjM5NDksImV4cCI6MjAxNTYzOTk0OX0.utPS9Byw5B4_8WE7JmG0kRNGjF6ZJaj_OJ9FstncrHU');



export default function Profile() {
  const router = useRouter();

  // Function to handle logout
  const handleLogout = async () => {
    // Sign out the user
    const { error } = await supabase.auth.signOut();

    if (!error) {
      // Redirect to the home page after successful logout
      router.push('/');
    } else {
      console.error('Error during logout:', error.message);
    }
  };

  // Ensure the user is authenticated before rendering the profile page
  useEffect(() => {
    // Check if the user is not authenticated and redirect to the login page
    if (!supabase.auth.user()) {
      router.push('/login'); // Replace with your login route
    }
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
