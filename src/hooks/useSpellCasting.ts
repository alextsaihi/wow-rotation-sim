// src/hooks/useSpellCasting.ts
import { useEffect } from 'react';
import { useKeybinds } from '../contexts/KeybindContext';
import { useRecentCasts } from '../contexts/RecentCastsContext';

export const useSpellCasting = () => {
  const { keybinds, isAssigning } = useKeybinds();
  const { addRecentCast } = useRecentCasts();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const spell = keybinds[e.code];
      if (!spell) return;

      if (!isAssigning) {
        addRecentCast(spell);
        console.log(`Casted ${spell.name} with key ${e.code}`);
      }
    };


    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keybinds, addRecentCast]);
};