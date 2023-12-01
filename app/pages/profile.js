import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';

const Profile = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Déconnexion de l'utilisateur
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Logout Error:', error);
      } else {
        console.log('User logged out successfully');
        router.push('/');
      }
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
