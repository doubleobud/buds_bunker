import React, { useEffect } from 'react';
import { PlayerProvider, usePlayer } from '@site/src/contexts/PlayerContext';

// ✅ Hydration-time suppression to prevent navbar flash
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-navbar', 'false');
}

const UnlockHandler = ({ children }) => {
  const { unlocks, loading } = usePlayer();

  useEffect(() => {
    if (loading) return;

    const shouldShowNavbar = unlocks?.navbar_enabled;

    // Apply or remove navbar suppression
    document.documentElement.setAttribute(
      'data-navbar',
      shouldShowNavbar ? 'true' : 'false'
    );
  }, [unlocks, loading]);

  return <>{children}</>;
};

export default function Root({ children }) {
  return (
    <PlayerProvider>
      <UnlockHandler>{children}</UnlockHandler>
    </PlayerProvider>
  );
}
