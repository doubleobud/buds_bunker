// src/components/TokenDisplay.jsx
import React, { useEffect, useState } from 'react';
import { getBalance } from '../services/token';

export default function TokenDisplay({ type = 'currency' }) {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBalance(type)
      .then(setBalance)
      .catch(() => setBalance(null))
      .finally(() => setLoading(false));
  }, [type]);

  if (loading) return <p>Loading {type} balance...</p>;

  return (
    <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
      {type.charAt(0).toUpperCase() + type.slice(1)} Tokens: {balance ?? 0}
    </div>
  );
}
