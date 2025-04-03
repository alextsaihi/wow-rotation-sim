// src/hooks/useSpellCasting.ts
import { useEffect, useRef } from 'react';
import { useKeybinds } from '../contexts/KeybindContext';
import { useRecentCasts } from '../contexts/RecentCastsContext';

export const useSpellCasting = () => {
  const { keybinds, isAssigning } = useKeybinds();
  const { addRecentCast } = useRecentCasts();
  const lastCastTime = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const spell = keybinds[e.code];
      if (!spell) return;

      // Only process casting when not in keybind assignment mode
      if (!isAssigning) {
        const now = Date.now();
        
        // Check Global Cooldown (1.5 seconds)
        if (lastCastTime.current && now - lastCastTime.current < 1500) {
          console.log(`GCD active - cannot cast ${spell.name} yet`);
          return;
        }

        // Update last cast time and add to recent casts
        lastCastTime.current = now;
        addRecentCast(spell);
        console.log(`Casted ${spell.name} with key ${e.code}`);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keybinds, isAssigning, addRecentCast]); // Added isAssigning to dependencies

  // No need to expose anything if you're only using this for keypress handling
};