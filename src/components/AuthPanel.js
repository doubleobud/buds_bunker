import React, { useState } from 'react'
import { useHistory } from '@docusaurus/router'
import { signUp, signIn, signOut } from '@site/src/services/auth'
import { createCharacterIfNotExists } from '@site/src/services/character'
import { BASE_URL } from '@site/src/config/constants'

export default function AuthPanel() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  const handleSignUp = async () => {
    try {
      await signUp(email, password)
      setMessage('✅ Sign-up successful! Please check your email to confirm.')
    } catch (err) {
      console.error(err)
      setMessage(`❌ Sign-up failed: ${err.message}`)
    }
  }

  const handleSignIn = async () => {
    try {
      const { user: signedInUser } = await signIn(email, password)
      if (!signedInUser || !signedInUser.id) {
        throw new Error('Missing or invalid user from Supabase')
      }

      setUser(signedInUser)
      setMessage('🔄 Signed in! Checking for character...')

      try {
        await createCharacterIfNotExists()
        setMessage('✅ Character ready! Redirecting...')
        setTimeout(() => history.push(`${BASE_URL}/profile`), 3000)
      } catch (charErr) {
        console.error(charErr)
        setMessage('❌ Character creation failed. Please try again or contact support.')
      }
    } catch (err) {
      console.error(err)
      setMessage(`❌ Sign-in failed: ${err.message}`)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      setUser(null)
      setMessage('👋 Signed out.')
    } catch (err) {
      console.error(err)
      setMessage(`❌ Sign-out failed: ${err.message}`)
    }
  }

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '6px' }}>
      <h2>🔑 Sign Up / Sign In</h2>

      {!user && (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: 'block', marginBottom: '0.5rem' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: 'block', marginBottom: '0.5rem' }}
          />
          <button onClick={handleSignUp}>Create Account</button>
          <button onClick={handleSignIn} style={{ marginLeft: '0.5rem' }}>
            Sign In
          </button>
        </>
      )}

      {user && (
        <>
          <p>👤 Logged in as: {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      )}

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  )
}
