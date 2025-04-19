import React, { useEffect, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import { supabase } from '../services/supabaseClient';
import { BASE_URL } from '../config/constants';

export default function EmailConfirmPage() {
  const history = useHistory();
  const [message, setMessage] = useState('Checking email confirmation...');

  useEffect(() => {
    const processConfirmation = async () => {
      try {
        // 🔁 New method for Supabase v2
        const { error: confirmError } = await supabase.auth.exchangeCodeForSession();

        if (confirmError) {
          console.error('Exchange error:', confirmError.message);
          setMessage('Email confirmation link is invalid or expired. Please sign in manually.');
          setTimeout(() => history.push(`${BASE_URL}/auth-test`), 3000);
          return;
        }

        // ✅ Successful, redirect to profile
        setMessage('✅ Email confirmed! Redirecting to your profile...');
        setTimeout(() => {
          history.push(`${BASE_URL}/profile`);
        }, 2000);
      } catch (err) {
        console.error('Unexpected error:', err.message);
        setMessage('An unexpected error occurred during confirmation.');
        setTimeout(() => history.push(`${BASE_URL}/auth-test`), 3000);
      }
    };

    processConfirmation();
  }, [history]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{message}</h2>
    </div>
  );
}
