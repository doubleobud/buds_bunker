// src/components/QuestionBlock.jsx

import React, { useState, useContext } from 'react';
import { earn } from '../services/token';
import { log } from '../services/log';
import { grantSeed } from '../services/character';
import { addBeliefBadge } from '../services/badges';
import { RewardContext } from './RewardPopupContext';

/**
 * Props:
 *  questionKey   (string, required): unique key for analytics/unlock log
 *  text          (string, required): question text
 *  choices       (object)          : { key: label }. Defaults to Yes/No.
 *  withConfidence(boolean)         : show 1–100 slider (default true)
 *  seedMap       (object)          : optional map key ➜ seed name for grantSeed
 */
export default function QuestionBlock({
  questionKey = 'unnamed_question',
  text,
  choices = { yes: 'Yes', no: 'No' },
  withConfidence = true,
  seedMap = null,
}) {
  const [choice, setChoice] = useState(null);
  const [confidence, setConfidence] = useState(50);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showReward } = useContext(RewardContext);

  const handleSubmit = async () => {
    if (submitted || !choice) return;
    setLoading(true);
    try {
      // 1️⃣ Award token
      await earn(1);
      // 2️⃣ Optional: grant a seed (for first‐seed question)
      if (seedMap && seedMap[choice]) {
        await grantSeed(seedMap[choice]);
      }
      // 3️⃣ Analytics log
      await log('question_answered', {
        questionKey,
        answer: choice,
        confidence: withConfidence ? confidence : null,
      });
      // 4️⃣ Add a belief badge
      await addBeliefBadge(
        questionKey,
        text,
        `You answered “${choices[choice] || choice}”`,
        withConfidence ? confidence : null
      );
      // 5️⃣ Show reward popup
      showReward({ icon: '🪙', message: 'You earned 1 token!' });
      setSubmitted(true);
    } catch (err) {
      console.error('Question submit failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <p className="success-message">
        ✅ Answer recorded! Thanks for your input.
      </p>
    );
  }

  return (
    <div className="question-card" style={{ margin: '2rem 0', textAlign: 'center' }}>
      <h3>{text}</h3>

      {/* choice buttons */}
      <div style={{ margin: '0.75rem 0' }}>
        {Object.entries(choices).map(([key, label]) => (
          <button
            key={key}
            className={`btn choice ${choice === key ? 'selected' : ''}`}
            onClick={() => setChoice(key)}
            disabled={loading}
            style={{ marginRight: '0.75rem' }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* confidence slider */}
      {withConfidence && choice && (
        <div style={{ margin: '0.75rem 0' }}>
          <label>
            Confidence: {confidence}%
            <input
              type="range"
              min="1"
              max="100"
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              disabled={loading}
              style={{ width: '100%' }}
            />
          </label>
        </div>
      )}

      {/* submit button */}
      {choice && (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? 'Submitting…' : 'Submit Answer'}
        </button>
      )}
    </div>
  );
}
