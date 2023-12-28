// Import necessary dependencies and hooks
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';

// Define the Callback component
const Callback = () => {
  const router = useRouter();

  // Use the useEffect hook to handle side effects when the component mounts
  useEffect(() => {
    // Asynchronous function to check GitHub login status
    const checkGitHubLoginStatus = async () => {
      // Attempt to sign in using GitHub as the authentication provider through Supabase
      const { user, session, error } = await supabase.auth.signIn({
        provider: 'github',
      });

      // If the user is present, GitHub login was successful
      if (user) {
        console.log('GitHub Login Successful:', user);
        // Redirect the user to the '/profile' page
        router.push('/profile');
      } else {
        // If there is an error during GitHub login, log the error and redirect to the home page ('/')
        console.error('GitHub Login Error:', error);
        router.push('/');
      }
    };

    // Call the function to check GitHub login status
    checkGitHubLoginStatus();
  }, [router]); // Dependency array to ensure the effect runs only when the 'router' object changes

  // Return a simple JSX element indicating that the component is processing the GitHub callback
  return <div>Processing GitHub Callback...</div>;
};

// Export the Callback component
export default Callback;
