import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { supabase } from '@site/src/services/supabaseClient';
import {
  getCharacterForUser,
  updateCharacter,
  createCharacterIfNotExists,
} from '@site/src/services/character';
import Spinner from '@site/src/components/Spinner';
import TourGuide from '@site/src/components/TourGuide';
import TokenDisplay from '@site/src/components/TokenDisplay';
import SymbolTreeStub from '@site/src/components/SymbolTreeStub';
import { isUnlocked } from '@site/src/services/unlock';

const generateRandomID = () =>
  String(Math.floor(100000 + Math.random() * 900000));

export default function IdentityCenter() {
  const [session, setSession] = useState(null);
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customId, setCustomId] = useState('');
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);
  const [tourReady, setTourReady] = useState(false);
  const [selfVisible, setSelfVisible] = useState(false);
  const [treeVisible, setTreeVisible] = useState(false);

  const continueUrl = useBaseUrl('/timeline/origin');
  const devUrl = useBaseUrl('/profile/development');

  // Shepherd tour steps
  const steps = [
    {
      attachTo: { element: '[data-tour="action-bar"]', on: 'bottom' },
      title: 'Profile Navigation',
      text: ['Use these buttons to progress or replay the tour.'],
    },
    {
      attachTo: { element: '[data-tour="id-number"]', on: 'right' },
      title: 'Your ID Number',
      text: ['This is your unique 6‑digit identifier.'],
    },
    {
      attachTo: { element: '[data-tour="token-display"]', on: 'bottom' },
      title: 'Token Balance',
      text: ['Your current token count is shown here.'],
    },
    {
      attachTo: { element: '[data-tour="show-tour"]', on: 'bottom' },
      title: 'Show Tour Again',
      text: ['Replay this tutorial any time.'],
    },
  ];

  // Load session
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session || null);
    })();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_e, newSession) => setSession(newSession)
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  // Load or create character, then check unlocks
  useEffect(() => {
    if (!session) return;
    (async () => {
      try {
        let data = await getCharacterForUser();
        if (!data) {
          await createCharacterIfNotExists();
          data = await getCharacterForUser();
        }
        if (!data.user_id_number) {
          const newId = generateRandomID();
          await updateCharacter({ user_id_number: newId });
          data.user_id_number = newId;
        }
        setCharacter(data);

        // Check our unlock flags
        setSelfVisible(await isUnlocked('self_revealed'));
        setTreeVisible(await isUnlocked('symbol_tree_revealed'));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [session]);

  // Sync customId input box with character state
  useEffect(() => {
    if (character?.user_id_number) {
      setCustomId(character.user_id_number);
    }
  }, [character]);

  // Trigger tour when ready
  useEffect(() => {
    if (!loading && !error && character) setTourReady(true);
  }, [loading, error, character]);

  // Button handlers
  const handleContinue = () => (window.location.href = continueUrl);
  const handleDev = () => (window.location.href = devUrl);
  const handleRestart = () => {
    localStorage.removeItem('tour-profile-seen');
    window.profileTour?.start();
  };

  // ID check/save
  const checkNumber = async () => {
    if (!/^[0-9]{6}$/.test(customId)) {
      setIsAvailable(false);
      setAvailabilityMessage('Enter a valid 6‑digit number.');
      return;
    }
    const { data, error } = await supabase
      .from('characters')
      .select('id')
      .eq('user_id_number', customId);
    if (error) {
      setIsAvailable(false);
      setAvailabilityMessage('Error checking availability.');
      return;
    }
    const taken = data.some((row) => row.id !== character.id);
    setIsAvailable(!taken);
    setAvailabilityMessage(taken ? 'Number already in use.' : 'Number is available!');
  };

  const saveNumber = async () => {
    if (!isAvailable) return;
    try {
      await updateCharacter({ user_id_number: customId });
      setAvailabilityMessage('ID saved.');
    } catch {
      setAvailabilityMessage('Save failed, try again.');
    }
  };

  // Early returns
  if (!session)
    return (
      <Layout title="Identity Center">
        <p className="text-center mt-12 text-lg">⚠️ Please sign in first.</p>
      </Layout>
    );
  if (loading)
    return (
      <Layout title="Identity Center">
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      </Layout>
    );
  if (error)
    return (
      <Layout title="Identity Center">
        <p className="text-center text-red-600 mt-12 text-lg">Error: {error}</p>
      </Layout>
    );

  return (
    <Layout title="Identity Center">
      {tourReady && <TourGuide steps={steps} />}

      <main className="max-w-3xl mx-auto px-6 pt-12 pb-20 space-y-12">
        {/* ── Action Bar ── */}
        <div
          className="text-right mb-4 flex items-center justify-end space-x-2"
          data-tour="action-bar"
        >
          <button className="btn btn-outline" onClick={handleContinue}>
            📘 Continue Narrative
          </button>
          <button className="btn btn-outline" onClick={handleDev}>
            📘 Go to Character Development
          </button>
          <button
            className="btn btn-outline"
            data-tour="show-tour"
            onClick={handleRestart}
          >
            📘 Show Tour Again
          </button>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight">User Profile</h1>

        {/* ── ID Number ── */}
        <section
          className="bg-[#fdfcf5] border border-gray-200 shadow-md rounded-xl p-6 space-y-4"
          data-tour="id-number"
        >
          <h2 className="text-xl font-semibold border-b pb-2">Your ID Number</h2>
          <div className="flex flex-wrap gap-2 items-center">
            <input
              className="input flex-grow min-w-[140px]"
              value={customId}
              onChange={(e) => setCustomId(e.target.value)}
              placeholder="6‑digit number"
            />
            <button className="btn btn-info" onClick={checkNumber}>
              Check
            </button>
            <button
              className="btn btn-primary disabled:opacity-50"
              disabled={!isAvailable}
              onClick={saveNumber}
            >
              Save ID
            </button>
          </div>
          {availabilityMessage && (
            <p className={isAvailable ? 'success-message' : 'error-message'}>
              {availabilityMessage}
            </p>
          )}
        </section>

        {/* ── Token Balance (always visible) ── */}
        <section data-tour="token-display">
          <TokenDisplay type="token" />
        </section>

        {/* ── Self + Symbol Tree (gated) ── */}
        {selfVisible && (
          <section className="bg-[#fdfcf5] border border-gray-200 shadow-md rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Self Development</h2>
            <p>
              Self: <strong>{character.self?.toFixed(1)}</strong>
            </p>

            {treeVisible && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Symbol Tree</h3>
                <SymbolTreeStub self={character.self} />
              </div>
            )}
          </section>
        )}
      </main>
    </Layout>
  );
}
