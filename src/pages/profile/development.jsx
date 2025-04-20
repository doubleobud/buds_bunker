import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { getCharacterForUser, updateCharacter } from '@site/src/services/character';
import { getBalance, spend } from '@site/src/services/token';

export default function CharacterDevelopment() {
  const [character, setCharacter] = useState(null);
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const char = await getCharacterForUser();
        let bal = 0;
        try {
          bal = await getBalance('currency');
        } catch {}
        setCharacter(char);
        setBalance(bal);
      } catch {
        setMessage('Error loading data.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleUpgrade = async (stat, cost, delta) => {
    setMessage('');
    if (balance < cost) {
      setMessage('❌ Not enough tokens.');
      return;
    }

    const newStats = { ...character.stats, [stat]: (character.stats?.[stat] || 0) + delta };
    try {
      await spend(cost, 'currency', `upgrade-${stat}`);
      await updateCharacter({ stats: newStats });
      setCharacter((c) => ({ ...c, stats: newStats }));
      setBalance((b) => b - cost);
      setMessage(`✅ ${stat.charAt(0).toUpperCase() + stat.slice(1)} +${delta}`);
    } catch {
      setMessage('❌ Upgrade failed.');
    }
  };

  if (loading) {
    return (
      <Layout title="Character Development">
        <div className="text-center mt-24 text-lg">Loading…</div>
      </Layout>
    );
  }

  return (
    <Layout title="Character Development">
      <main className="max-w-3xl mx-auto p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Character Development</h1>
          <Link className="btn btn-outline" to="/profile">
            ← Back to Profile
          </Link>
        </header>

        {/* Token Balance */}
        <section className="mb-8 bg-[#f4f4f4] border rounded-lg p-4">
          <h2 className="text-xl font-semibold">Currency Tokens</h2>
          <p className="text-2xl font-bold mt-2">{balance}</p>
        </section>

        {/* Feedback Message */}
        {message && (
          <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg px-4 py-2">
            {message}
          </div>
        )}

        {/* Available Upgrades */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Available Upgrades</h2>
          <div className="grid gap-4">
            <UpgradeCard
              label="💪 +10 Health"
              cost={5}
              onClick={() => handleUpgrade('health', 5, 10)}
            />
            <UpgradeCard
              label="⚡ +5 Stamina"
              cost={5}
              onClick={() => handleUpgrade('stamina', 5, 5)}
            />
            <UpgradeCard
              label="🧠 +10 XP"
              cost={10}
              onClick={() => handleUpgrade('xp', 10, 10)}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

function UpgradeCard({ label, cost, onClick }) {
  return (
    <div className="flex justify-between items-center bg-white border border-gray-300 rounded-lg px-6 py-3 shadow-sm">
      <div className="flex-1">
        <span className="text-lg">{label}</span>
      </div>
      <div className="w-[120px] text-right">
        <button className="btn btn-primary w-full" onClick={onClick}>
          Spend {cost}
        </button>
      </div>
    </div>
  );
}
