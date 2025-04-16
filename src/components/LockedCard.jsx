// src/components/LockedCard.jsx

import React from 'react';
import styles from './LockedCard.module.css'; // See below for CSS module

/**
 * A stylized card that communicates a section is locked.
 * 
 * Props:
 * - title: section name (e.g., "Codex")
 * - reason: string explaining the unlock requirement
 */
const LockedCard = ({ title = "Locked Content", reason = "Progress further to access this section." }) => {
  return (
    <div className={styles.lockedCard}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.reason}>{reason}</p>
      <p className={styles.lockedIcon}>🔒</p>
    </div>
  );
};

export default LockedCard;
