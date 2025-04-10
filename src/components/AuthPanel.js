import React, { useState } from 'react';
import { useHistory } from '@docusaurus/router';
import { signUp, signIn, signOut } from '../services/auth';
import { createDefaultCharacter } from '../services/character';
import { supabase } from '../services/supabaseClient';

export default function AuthPanel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleSignUp = async () => {
    try {
      const { error } = await signUp(email, password);
      if (error) throw error;

      setMessage(
        '✅ Sign-up successful! Please check your email to confirm your account before signing in.'
      );
    } catch (err) {
      console.error(err);
      setMessage(`Sign-up error: ${err.message}`);
    }
  };

  const handleSignIn = async () => {
    try {
      const { user: signedInUser, error } = await signIn(email, password);
      if (error) throw error;

      setUser(signedInUser);
      setMessage('Signed in! Creating character...');

      await createDefaultCharacter(signedInUser.id);
      setMessage('Character created! Redirecting to profile...');

      setTimeout(() => {
        history.push('/profile');
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage(`Sign-in error: ${err.message}`);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;

      setUser(null);
      setMessage('Signed out.');
    } catch (err) {
      console.error(err);
      setMessage(`Sign-out error: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #444' }}>
      <h2>🧪 Auth Panel</h2>

      {!user && (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: 'block', marginBottom: '0.5rem' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: 'block', marginBottom: '0.5rem' }}
          />
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={handleSignIn} style={{ marginLeft: '0.5rem' }}>
            Sign In
          </button>
        </>
      )}

      {user && (
        <>
          <p>👤 Logged in as: {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      )}

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}
