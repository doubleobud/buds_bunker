// src/components/TokenDisplay.jsx
import React, { useEffect, useState } from 'react';
import { getBalance } from '../services/token';

export default function TokenDisplay({ type = 'token' }) {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBalance(type)
      .then(setBalance)
      .catch(() => setBalance(null))
      .finally(() => setLoading(false));
  }, [type]);

  if (loading) return <p>Loading tokens...</p>;

  return (
    <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
      Tokens: {balance ?? 0}
    </div>
  );
}
