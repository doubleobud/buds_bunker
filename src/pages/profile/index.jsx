import React, { useEffect, useState } from 'react'
import Layout from '@theme/Layout'
import { supabase } from '@site/src/services/supabaseClient'
import { getCharacterForUser, updateCharacter } from '@site/src/services/character'
import Spinner from '@site/src/components/Spinner'
import TourGuide from '@site/src/components/TourGuide'

export default function ProfilePage() {
  const [session, setSession] = useState(null)
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tourReady, setTourReady] = useState(false)

  // Load Supabase auth session
  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data?.session) setSession(data.session)
    }

    fetchSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  // Load character data
  useEffect(() => {
    if (!session) return

    ;(async () => {
      try {
        const data = await getCharacterForUser()
        if (!data) throw new Error('No character found for user')
        setCharacter(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [session])

  // After all data is ready, allow tour to be shown
  useEffect(() => {
    if (!loading && !error && character) {
      setTimeout(() => setTourReady(true), 800)
    }
  }, [loading, error, character])

  const tourSteps = [
    {
      selector: '[data-tour="display-name"]',
      content: '🧑 This is your public display name. You can change it here.',
    },
    {
      selector: '[data-tour="stats"]',
      content: '📊 These are your character’s current stats.',
    },
    {
      selector: '[data-tour="sign-out"]',
      content: '🚪 Use this button to sign out when finished.',
    },
  ]

  if (!session)
    return (
      <Layout title="Profile">
        <p>You need to sign in first.</p>
      </Layout>
    )

  if (loading)
    return (
      <Layout title="Profile">
        <Spinner />
      </Layout>
    )

  if (error)
    return (
      <Layout title="Profile">
        <p>Error: {error}</p>
      </Layout>
    )

  return (
    <Layout title="Profile">
      {tourReady && <TourGuide steps={tourSteps} />}

      <section className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Account</h1>
        <div className="border p-4 rounded-lg mb-6">
          <p>Email: {session.user.email}</p>
          <button
            className="btn btn-secondary mt-2"
            data-tour="sign-out"
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4">Character</h2>
        <div className="border p-4 rounded-lg">
          <label className="block font-semibold mb-1">Display Name</label>
          <input
            data-tour="display-name"
            className="input mb-3"
            value={character.display_name || ''}
            onChange={(e) =>
              setCharacter({ ...character, display_name: e.target.value })
            }
            onBlur={async () => {
              await updateCharacter({
                display_name: character.display_name,
              })
            }}
          />

          <label className="block font-semibold mb-1">Stats</label>
          <pre
            data-tour="stats"
            className="bg-gray-900 text-green-300 p-3 rounded"
          >
            {JSON.stringify(character.stats, null, 2)}
          </pre>
        </div>
      </section>
    </Layout>
  )
}
