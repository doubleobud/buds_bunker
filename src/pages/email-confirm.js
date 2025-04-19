import React, { useEffect, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import { supabase } from '../services/supabaseClient';
import { BASE_URL } from '../config/constants';

export default function EmailConfirmPage() {
  const history = useHistory();
  const [message, setMessage] = useState('Checking email confirmation...');

  useEffect(() => {
    const processConfirmation = async () => {
      // ✅ Extract access_token + refresh_token from URL hash
      const { error: urlError } = await supabase.auth.getSessionFromUrl();

      if (urlError) {
        setMessage('Email confirmation link is invalid or expired. Please sign in manually.');
        setTimeout(() => {
          history.push(`${BASE_URL}/auth-test`);
        }, 3000);
        return;
      }

      // ✅ Now try to fetch the session user
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (!user || userError) {
        setMessage('Could not verify your session. Please log in manually.');
        setTimeout(() => {
          history.push(`${BASE_URL}/auth-test`);
        }, 3000);
        return;
      }

      setMessage('✅ Email confirmed! Redirecting to your profile...');
      setTimeout(() => {
        history.push(`${BASE_URL}/profile`);
      }, 2000);
    };

    processConfirmation();
  }, [history]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{message}</h2>
    </div>
  );
}
