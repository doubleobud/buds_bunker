import React, { useEffect } from 'react';

export default function RewardPopup({ icon, message, onDismiss }) {
  useEffect(() => {
    const id = setTimeout(onDismiss, 2000);
    return () => clearTimeout(id);
  }, [onDismiss]);

  return (
    <div className="reward-overlay" role="alertdialog">
      <div className="reward-popup">
        <div style={{ fontSize: '2.5rem' }}>{icon}</div>
        <div style={{ fontWeight: 600 }}>{message}</div>
        <button
          aria-label="Dismiss"
          onClick={onDismiss}
          style={{ /* simple X button styling */ }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
