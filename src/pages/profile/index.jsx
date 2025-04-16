import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import {supabase} from '@site/src/services/supabaseClient';
import {
  getCharacterForUser,
  updateCharacter,
} from '@site/src/services/character';
import Spinner   from '@site/src/components/Spinner';
import TourGuide from '@site/src/components/TourGuide';

/* ───────── helpers ───────── */
const generateRandomID = () =>
  String(Math.floor(100000 + Math.random() * 900000));

export default function IdentityCenter() {
  /* ── state ──────────────────────────────────────────── */
  const [session,   setSession]   = useState(null);
  const [character, setCharacter] = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  const [customId,            setCustomId]            = useState('');
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [isAvailable,         setIsAvailable]         = useState(null);

  const [tourReady, setTourReady] = useState(false);

  /* ── auth session ───────────────────────────────────── */
  useEffect(() => {
    const load = async () => {
      const {data} = await supabase.auth.getSession();
      if (data?.session) setSession(data.session);
    };
    load();

    const {data: listener} = supabase.auth.onAuthStateChange(
      (_e, newSession) => setSession(newSession),
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  /* ── character load / create ────────────────────────── */
  useEffect(() => {
    if (!session) return;
    (async () => {
      try {
        const data = await getCharacterForUser();
        if (!data) throw new Error('No character found for user');

        if (!data.user_id_number) {
          const newId = generateRandomID();
          await updateCharacter({user_id_number: newId});
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

  /* ── start tour when ready ──────────────────────────── */
  useEffect(() => {
    if (!loading && !error && character) setTourReady(true);
  }, [loading, error, character]);

  /* ── shepherd steps (unchanged) ─────────────────────── */
  const tourSteps = [
    {
      attachTo: {element: '[data-tour="id-number"]', on: 'right'},
      title: 'ID Number',
      text: [
        'This 6‑digit ID is auto‑generated.',
        'You can replace it with any unused number.',
      ],
      classes: 'shepherd-theme-arrows',
      scrollTo: true,
    },
    {
      attachTo: {element: '[data-tour="stats-message"]', on: 'bottom'},
      title: 'Character Attributes',
      text: ['Attributes you acquire will appear here once you start progressing.'],
      classes: 'shepherd-theme-arrows',
      scrollTo: true,
    },
    {
      attachTo: {element: '[data-tour="continue-narrative"]', on: 'bottom'},
      title: 'Continue Narrative',
      text: ['Click to jump into the next chapter of the story.'],
      classes: 'shepherd-theme-arrows',
      scrollTo: true,
    },
    {
      attachTo: {element: '[data-tour="show-tour"]', on: 'bottom'},
      title: 'Show Tour Again',
      text: ['Replay this tutorial any time.'],
      classes: 'shepherd-theme-arrows',
      scrollTo: true,
    },
  ];

  /* ── handlers ───────────────────────────────────────── */
  const handleCheckAvailability = async () => {
    const valid = /^[0-9]{6}$/.test(customId);
    if (!valid) {
      setIsAvailable(false);
      setAvailabilityMessage('Enter a valid 6‑digit number.');
      return;
    }

    const {data, error} = await supabase
      .from('characters')
      .select('id')
      .eq('user_id_number', customId);

    if (error) {
      setIsAvailable(false);
      setAvailabilityMessage('Error checking availability.');
      return;
    }

    const taken = data.some(row => row.id !== character.id);
    setIsAvailable(!taken);
    setAvailabilityMessage(
      taken ? 'Number already in use.' : 'Number is available!',
    );
  };

  const handleSaveCustomId = async () => {
    if (!isAvailable) return;
    try {
      await updateCharacter({user_id_number: customId});
      setCharacter(c => ({...c, user_id_number: customId}));
      setAvailabilityMessage('ID saved.');
    } catch {
      setAvailabilityMessage('Save failed, try again.');
    }
  };

  /* ── early exits ────────────────────────────────────── */
  if (!session)
    return (
      <Layout title="Identity Center">
        <p className="text-center mt-10">⚠️ Please sign in first.</p>
      </Layout>
    );

  if (loading)
    return (
      <Layout title="Identity Center">
        <div className="flex justify-center mt-10">
          <Spinner />
        </div>
      </Layout>
    );

  if (error)
    return (
      <Layout title="Identity Center">
        <p className="text-center text-red-600 mt-10">Error: {error}</p>
      </Layout>
    );

  /* ── render ─────────────────────────────────────────── */
  return (
    <Layout title="Identity Center">
      {tourReady && <TourGuide steps={tourSteps} />}

      {/* action bar (buttons injected by TourGuide) */}
      <div className="bg-gray-100 border-b border-gray-300 py-2 px-4 flex gap-2" />

      {/* main content */}
      <main className="max-w-3xl mx-auto px-4 py-10 space-y-10">

        <h1 className="text-4xl font-extrabold tracking-tight">
          User Profile
        </h1>

        {/* ── ID Number card ───────────────────────────── */}
        <section
          className="bg-[#fdfcf5] border border-gray-200 shadow-md rounded-xl p-6 space-y-4"
          data-tour="id-number"
        >
          <h2 className="text-xl font-semibold border-b pb-2">
            Your ID Number
          </h2>

          <div className="flex flex-wrap gap-2 items-center">
            <input
              className="input flex-grow min-w-[140px]"
              value={customId}
              onChange={e => setCustomId(e.target.value)}
              placeholder="6‑digit number"
            />
            <button className="btn btn-info" onClick={handleCheckAvailability}>
              Check
            </button>
            <button
              className="btn btn-primary disabled:opacity-50"
              disabled={!isAvailable}
              onClick={handleSaveCustomId}
            >
              Save ID
            </button>
          </div>

          {availabilityMessage && (
            <p
              className={
                isAvailable ? 'success-message' : 'error-message'
              }
            >
              {availabilityMessage}
            </p>
          )}
        </section>

        {/* ── Stats card ──────────────────────────────── */}
        <section className="bg-[#fdfcf5] border border-gray-200 shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold border-b pb-2">
            Character Stats
          </h2>

          <p
            className="italic text-gray-600"
            data-tour="stats-message"
          >
            You haven’t earned any stats yet. Keep progressing to unlock them.
          </p>

          {/* original table kept for later use */}
          {/*
          <div data-tour="stats">…</div>
          */}
        </section>
      </main>
    </Layout>
  );
}
