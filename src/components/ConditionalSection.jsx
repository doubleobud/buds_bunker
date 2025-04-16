// src/components/ConditionalSection.jsx

import React from 'react';
import { isUnlocked } from '@/services/unlocks';

/**
 * Renders children if unlockKey passes; otherwise shows fallback or nothing.
 * 
 * Props:
 * - stats: the user's stats object from Supabase
 * - unlockKey: string (e.g. 'codex_unlocked')
 * - fallback: optional JSX element (e.g. <LockedCard />)
 */
export const ConditionalSection = ({ stats, unlockKey, fallback = null, children }) => {
  if (!isUnlocked(stats, unlockKey)) {
    return fallback;
  }
  return <>{children}</>;
};
