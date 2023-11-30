
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from './supabase-config'; 

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
