// src/components/InteractionFooter.jsx
import React, { useState } from 'react';
import styles from './InteractionFooter.module.css';
import { submitResult } from '../services/interaction';

export default function InteractionFooter({ id, prompt, options }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (option) => {
    if (submitted) return;

    setSelected(option.value);
    setSubmitted(true);
    setFeedback(option.feedback || (option.correct ? '✅ Correct!' : '❌ Incorrect.'));

    try {
      await submitResult({
        id,
        correct: !!option.correct,
        reward: option.reward || 0
      });
    } catch (err) {
      console.error('Interaction submission failed:', err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.prompt}>{prompt}</div>
      <div className={styles.options}>
        {options.map((opt, idx) => (
          <button
            key={idx}
            className={styles.optionButton}
            onClick={() => handleSubmit(opt)}
            disabled={submitted}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {feedback && <div className={styles.feedback}>{feedback}</div>}
    </div>
  );
}
