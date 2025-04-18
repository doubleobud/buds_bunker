import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [unlocks, setUnlocks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUnlocks = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        if (!userId) return;

        const { data, error } = await supabase
          .from('characters')
          .select('stats')
          .eq('user_id', userId)
          .single();

        if (data?.stats?.unlocks) {
          setUnlocks(data.stats.unlocks);
        }
      } catch (err) {
        console.error('Error loading player unlocks:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUnlocks();
  }, []);

  return (
    <PlayerContext.Provider value={{ unlocks, loading }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
