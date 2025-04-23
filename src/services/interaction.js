// src/services/interaction.js
import { earn } from './token';
import { log } from './log';

export async function submitResult({ id, correct = false, reward = 0 }) {
  await log('interaction_submit', { id, correct, reward });

  if (correct && reward > 0) {
    await earn(reward, 'currency', `quiz-${id}`);
  }
}
