// src/components/RewardPopupContext.jsx
import React, { createContext, useCallback, useState } from 'react';

// shape: { icon: string, message: string }
export const RewardContext = createContext({
  showReward: () => {},
});

export function RewardPopupProvider({ children }) {
  const [reward, setReward] = useState(null);

  const showReward = useCallback(({ icon, message }) => {
    setReward({ icon, message });
    // auto‐hide after 2s
    setTimeout(() => setReward(null), 2000);
  }, []);

  return (
    <RewardContext.Provider value={{ showReward }}>
      {children}
      {reward && (
        <div
          className="reward-popup"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: 'var(--ifm-color-success)',
            color: '#fff',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'pop 0.3s ease',
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>{reward.icon}</span>
          <span>{reward.message}</span>
        </div>
      )}
      <style>
        {`
        @keyframes pop {
          0%   { transform: scale(0.8); opacity: 0 }
          50%  { transform: scale(1.05); opacity: 1 }
          100% { transform: scale(1);    opacity: 1 }
        }
        `}
      </style>
    </RewardContext.Provider>
  );
}

export default RewardPopupProvider;
