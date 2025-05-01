// src/components/ClaimTokenButton.jsx

import React, { useState, useEffect } from 'react';
import { earn } from '../services/token';
import { log } from '../services/log';
import { isUnlocked, unlock } from '../services/unlock';

export default function ClaimTokenButton() {
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(false);

  // On mount: hide button if we've already unlocked this feature
  useEffect(() => {
    (async () => {
      try {
        const unlocked = await isUnlocked('post_zero_read');
        setClaimed(unlocked);
      } catch (err) {
        console.error('Error checking unlock:', err);
      }
    })();
  }, []);

  const handleClaim = async () => {
    setLoading(true);
    try {
      // 1️⃣ Award token to main "token" balance
      await earn(1);
      // 2️⃣ Mark unlock
      await unlock('post_zero_read');
      // 3️⃣ Analytics event
      await log('post_zero_read', {});
      // 4️⃣ Update UI
      setClaimed(true);
    } catch (err) {
      console.error('Token claim failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (claimed) {
    return (
      <p className="success-message">
        🎉 Token claimed! You can now continue.
      </p>
    );
  }

  return (
    <button
      onClick={handleClaim}
      disabled={loading}
      className="claim-token-button"
    >
      {loading ? 'Processing...' : 'Claim Your First Token for Reading'}
    </button>
  );
}
