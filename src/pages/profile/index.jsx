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
import { usePlayer } from '@site/src/contexts/PlayerContext';

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
  const { unlocks, loading: unlocksLoading } = usePlayer();

  const continueUrl = useBaseUrl('/timeline/origin');
  const devUrl = useBaseUrl('/profile/development');

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

  useEffect(() => {
    if (!session) return;
    (async () => {
      try {
        let data = await getCharacterForUser();
        if (!data) {
          await createCharacterIfNotExists();
          data = await getCharacterForUser();
          if (!data) throw new Error('Failed to create character.');
        }
        if (!data.user_id_number) {
          const newId = generateRandomID();
          await updateCharacter({ user_id_number: newId });
          data.user_id_number = newId;
        }
        setCharacter(data);
        setCustomId(data.user_id_number);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [session]);

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
      attachTo: { element: '[data-tour="stats-message"]', on: 'bottom' },
      title: 'Character Stats',
      text: ['You’ll see stats here as you earn them.'],
    },
  ];

  useEffect(() => {
    if (!loading && !error && character) setTourReady(true);
  }, [loading, error, character]);

  const handleContinue = () => {
    window.location.href = continueUrl;
  };
  const handleDev = () => {
    window.location.href = devUrl;
  };
  const handleRestart = () => {
    localStorage.removeItem('tour-profile-seen');
    window.profileTour?.start();
  };

  const checkNumber = async () => {
    const valid = /^[0-9]{6}$/.test(customId);
    if (!valid) {
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
    setAvailabilityMessage(
      taken ? 'Number already in use.' : 'Number is available!'
    );
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

  if (!session)
    return (
      <Layout title="Identity Center">
        <p className="text-center mt-12 text-lg">⚠️ Please sign in first.</p>
      </Layout>
    );

  if (loading || unlocksLoading)
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
        {/* ── Blue‑box Action Bar ── */}
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
          <button className="btn btn-outline" onClick={handleRestart}>
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

        {/* ── Character Stats ── */}
        <section className="bg-[#fdfcf5] border border-gray-200 shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold border-b pb-2">Character Stats</h2>
          {unlocks?.profile_extended && character?.stats ? (
            <div data-tour="stats-message" className="space-y-2 text-gray-700">
              {Object.entries(character.stats).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b py-1">
                  <span className="capitalize">{key}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="italic text-gray-600" data-tour="stats-message">
              You haven’t earned any stats yet. Keep progressing to unlock them.
            </p>
          )}
        </section>
      </main>
    </Layout>
  );
}
