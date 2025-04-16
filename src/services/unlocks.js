// src/services/unlocks.js

/**
 * A centralized map of unlock rules, where each unlock is gated
 * by specific conditions based on the player's stats.
 */
export const unlockRules = {
    tutorial_complete: () => true,
  
    codex_unlocked: (stats) => stats?.tutorial_complete === true,
  
    faction_board_unlocked: (stats) =>
      stats?.tutorial_complete === true && stats?.codex_unlocked === true,
  
    lore_terminal_unlocked: (stats) =>
      stats?.keywords?.includes('introduction_to_the_bunker'),
  
    // Add more as needed...
  };
  
  /**
   * Returns true or false based on whether the unlock is satisfied.
   */
  export function isUnlocked(stats, unlockKey) {
    const rule = unlockRules[unlockKey];
    return rule ? rule(stats) : false;
  }
  