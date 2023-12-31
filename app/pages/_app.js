import React, { useState } from 'react';
import { UserProvider } from '../components/UserContext';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <UserProvider>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Component {...pageProps} />
      </SessionContextProvider>
    </UserProvider>
  );
}

export default MyApp;
