import React, { useState } from 'react';
import { spend } from '@site/src/services/token';
import { updateCharacter, getCharacterForUser } from '@site/src/services/character';
import { unlock, isUnlocked } from '@site/src/services/unlock';
import { log } from '@site/src/services/log';

export default function SelfCard({ initialSelf, initialTokens, onRefresh }) {
  const [self, setSelf] = useState(initialSelf ?? 0.0);
  const [tokens, setTokens] = useState(initialTokens ?? 0);
  const [message, setMessage] = useState('');

  const handleSpend = async () => {
    setMessage('');
    if (tokens < 1) {
      setMessage('❌ Not enough tokens.');
      return;
    }

    try {
      await spend(1, 'token', 'increase-self');
      const newSelf = parseFloat((self + 1.0).toFixed(1));
      setSelf(newSelf);
      setTokens(tokens - 1);
      await updateCharacter({ self: newSelf });
      await log('self_upgrade', { delta: 1.0, newSelf });

      const unlocked = await isUnlocked('symbol_tree_revealed');
      if (!unlocked && newSelf >= 2.0) {
        await unlock('symbol_tree_revealed', { triggeredBy: 'self >= 2.0' });
      }

      if (onRefresh) onRefresh(); // allow parent to re-pull profile
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to spend token.');
    }
  };

  return (
    <div className="bg-white border rounded-lg p-5 shadow-sm space-y-4">
      <div className="text-lg font-semibold">
        Self: <span className="font-bold">{self.toFixed(1)}</span>
      </div>
      <button className="btn btn-primary" onClick={handleSpend}>
        Spend 1 Token
      </button>
      {message && <div className="text-sm text-blue-600">{message}</div>}
    </div>
  );
}
