import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { getCharacterForUser } from '@site/src/services/character';
import TokenDisplay from '@site/src/components/TokenDisplay';
import SelfCard from '@site/src/components/SelfCard';
import SymbolTreeStub from '@site/src/components/SymbolTreeStub';
import { isUnlocked } from '@site/src/services/unlock';

export default function CharacterDevelopment() {
  const [character, setCharacter] = useState(null);
  const [treeUnlocked, setTreeUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCharacter = async () => {
    const data = await getCharacterForUser();
    setCharacter(data);
    const unlocked = await isUnlocked('symbol_tree_revealed');
    setTreeUnlocked(unlocked);
    setLoading(false);
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  if (loading || !character) {
    return (
      <Layout title="Self Growth">
        <div className="text-center mt-24 text-lg">Loading…</div>
      </Layout>
    );
  }

  return (
    <Layout title="Self Growth">
      <main className="max-w-3xl mx-auto p-6 space-y-8">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Self Growth</h1>
          <Link className="btn btn-outline" to="/profile">
            ← Back to Profile
          </Link>
        </header>

        <TokenDisplay type="token" />

        <SelfCard
          initialSelf={character.self}
          initialTokens={character.tokens_json?.token ?? 0}
          onRefresh={fetchCharacter}
        />

        {treeUnlocked && (
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">Symbol Tree</h2>
            <SymbolTreeStub self={character.self} />
          </section>
        )}
      </main>
    </Layout>
  );
}
