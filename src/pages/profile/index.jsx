import React, { useEffect, useState } from 'react'
import Layout from '@theme/Layout'
import { supabase } from '@site/src/services/supabaseClient'
import { getCharacterForUser, updateCharacter } from '@site/src/services/character'
import Spinner from '@site/src/components/Spinner'
import TourGuide from '@site/src/components/TourGuide'

// Utility function to generate a random 6-digit ID as a string.
function generateRandomID() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export default function IdentityCenter() {
  const [session, setSession] = useState(null)
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tourReady, setTourReady] = useState(false)

  const [customId, setCustomId] = useState('')
  const [availabilityMessage, setAvailabilityMessage] = useState('')
  const [isAvailable, setIsAvailable] = useState(null)

  // Fetch auth session on mount.
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

  // Fetch or create the user's character, auto-generating user_id_number if missing
  useEffect(() => {
    if (!session) return

    ;(async () => {
      try {
        const data = await getCharacterForUser()
        if (!data) throw new Error('No character found for user')

        if (!data.user_id_number) {
          const randomId = generateRandomID()
          const updateResponse = await updateCharacter({ user_id_number: randomId })
          if (updateResponse.error) {
            console.error('Failed to auto-update ID:', updateResponse.error)
            throw new Error('Auto-generation of ID failed.')
          }
          data.user_id_number = randomId
        }

        setCharacter(data)
        setCustomId(data.user_id_number || '')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [session])

  // Once data is ready, show the guided tour
  useEffect(() => {
    if (!loading && !error && character) {
      setTimeout(() => setTourReady(true), 800)
    }
  }, [loading, error, character])

  // Five-step tour, referencing new buttons in TourGuide
  const tourSteps = [
    {
      attachTo: {
        element: '[data-tour="id-number"]',
        on: 'right'
      },
      title: 'ID Number',
      text: [
        'This is your unique 6-digit ID. It is auto-generated when your account is created.',
        'You can change it to a custom number here if it’s available.'
      ],
      classes: 'shepherd-theme-arrows',
      scrollTo: true
    },
    {
      attachTo: {
        element: '[data-tour="stats"]',
        on: 'bottom'
      },
      title: 'Character Stats',
      text: [
        'These are your character’s current stats. They will grow as you play.'
      ],
      classes: 'shepherd-theme-arrows',
      scrollTo: true
    },
    {
      attachTo: {
        element: '[data-tour="sign-out"]',
        on: 'left'
      },
      title: 'Sign Out',
      text: [
        'Click here when you’re done to safely sign out.'
      ],
      classes: 'shepherd-theme-arrows',
      scrollTo: true
    },
    {
      attachTo: {
        element: '[data-tour="continue-narrative"]',
        on: 'bottom'
      },
      title: 'Continue Narrative',
      text: [
        'Click this button to continue the story and discover your next challenge.'
      ],
      classes: 'shepherd-theme-arrows',
      scrollTo: true
    },
    {
      attachTo: {
        element: '[data-tour="show-tour"]',
        on: 'bottom'
      },
      title: 'Show Tour Again',
      text: [
        'Need a refresher? Click here to restart the tutorial at any time.'
      ],
      classes: 'shepherd-theme-arrows',
      scrollTo: true
    }
  ]

  if (!session) {
    return (
      <Layout title="Identity Center">
        <div className="max-w-xl mx-auto p-6 text-center">
          <p className="text-lg">⚠️ You need to sign in first.</p>
        </div>
      </Layout>
    )
  }

  if (loading) {
    return (
      <Layout title="Identity Center">
        <div className="max-w-xl mx-auto p-6 text-center">
          <Spinner />
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout title="Identity Center">
        <div className="max-w-xl mx-auto p-6 text-center">
          <p className="text-red-600 font-semibold">Error: {error}</p>
        </div>
      </Layout>
    )
  }

  // Check if new number is valid & unused
  const handleCheckAvailability = async () => {
    const regex = /^[0-9]{6}$/
    if (!regex.test(customId)) {
      setAvailabilityMessage('Please enter a valid 6-digit number.')
      setIsAvailable(false)
      return
    }

    const { data, error } = await supabase
      .from('characters')
      .select('id')
      .eq('user_id_number', customId)

    if (error) {
      setAvailabilityMessage('Error checking availability.')
      setIsAvailable(false)
      return
    }

    const otherRecords = data.filter(record => record.id !== character.id)
    if (otherRecords.length > 0) {
      setAvailabilityMessage('This number is already in use.')
      setIsAvailable(false)
    } else {
      setAvailabilityMessage('This number is available.')
      setIsAvailable(true)
    }
  }

  // Save ID if it's available
  const handleSaveCustomId = async () => {
    if (!isAvailable) {
      setAvailabilityMessage('Please choose an available number before saving.')
      return
    }
    try {
      const response = await updateCharacter({ user_id_number: customId })
      if (response.error) {
        console.error('Update error:', response.error)
        throw new Error(response.error.message || 'Update failed.')
      }
      setCharacter(prev => ({ ...prev, user_id_number: customId }))
      setAvailabilityMessage('ID Number updated successfully.')
    } catch (err) {
      console.error('Error updating ID Number:', err)
      setAvailabilityMessage('Error updating ID Number.')
    }
  }

  return (
    <Layout title="Identity Center">
      {tourReady && <TourGuide steps={tourSteps} />}

      <section className="max-w-3xl mx-auto p-6 space-y-8">
        {/* Account Information Section */}
        <div className="border border-gray-300 rounded-lg p-5 shadow-md bg-white">
          <h1 className="text-3xl font-bold mb-4">Account Information</h1>
          <p className="mb-2">
            <strong>Email:</strong> {session.user.email}
          </p>
          <button
            data-tour="sign-out"
            className="btn btn-secondary"
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </button>
        </div>

        {/* User Identity Section */}
        <div className="border border-gray-300 rounded-lg p-5 shadow-md bg-white">
          <h2 className="text-2xl font-bold mb-4">User Identity</h2>
          <div className="mb-4" data-tour="id-number">
            <label htmlFor="idNumber" className="block font-semibold mb-1">
              ID Number
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="idNumber"
                className="input flex-grow"
                value={customId}
                onChange={e => setCustomId(e.target.value)}
                placeholder="Enter 6-digit number"
              />
              <button className="btn btn-info" onClick={handleCheckAvailability}>
                Check Availability
              </button>
            </div>
            {availabilityMessage && (
              <p className={`mt-2 ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {availabilityMessage}
              </p>
            )}
            <button className="btn btn-primary mt-3" onClick={handleSaveCustomId}>
              Save ID Number
            </button>
          </div>
        </div>

                {/* Character Stats Section */}
                <div className="border border-gray-300 rounded-lg p-5 shadow-md bg-white">
          <h2 className="text-2xl font-bold mb-4">Character Stats</h2>

          <p className="italic text-gray-500">
            You haven’t earned any stats yet. Keep progressing to unlock them.
          </p>

          {/*
          <div data-tour="stats" className="space-y-2">
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div><strong>Health:</strong> {character.stats?.health ?? '—'}</div>
              <div><strong>Stamina:</strong> {character.stats?.stamina ?? '—'}</div>
              <div><strong>Level:</strong> {character.stats?.level ?? '—'}</div>
              <div className="col-span-2">
                <strong>Keywords:</strong>
                <ul className="list-disc list-inside ml-4">
                  {(character.stats?.keywords || []).map((kw, idx) => (
                    <li key={idx}>{kw}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          */}
        </div>
      </section>
    </Layout>
  )
}

