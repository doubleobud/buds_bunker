import React, { useEffect, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import { supabase } from '../services/supabaseClient';

export default function EmailConfirmPage() {
  const history = useHistory();
  const [message, setMessage] = useState('Checking email confirmation...');

  useEffect(() => {
    const processConfirmation = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        setMessage('Email confirmation link is expired or invalid. Please sign in manually.');
        setTimeout(() => {
          history.push('/auth-test'); // ⬅️ redirect to sign-in
        }, 3000);
        return;
      }

      setMessage('✅ Email confirmed! Redirecting to your profile...');
      setTimeout(() => {
        history.push('/profile'); // ⬅️ you'll build this next
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
