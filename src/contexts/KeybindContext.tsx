// src/contexts/KeybindContext.tsx
import React, { createContext, useState, useContext, useCallback } from 'react';
import { Spell } from '../types';

interface KeybindContextType {
  keybinds: Record<string, Spell>; // { "KeyQ": 259489 }
  spellToKey: Record<number, string>; // { 259489: "KeyQ" }
  isAssigning: boolean;
  startAssigning: () => void;
  cancelAssigning: () => void;
  assignKeybind: (spell: Spell, key: string) => void;
  removeKeybind: (key: string) => void;
}

const KeybindContext = createContext<KeybindContextType | undefined>(undefined);

export const KeybindProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [keybinds, setKeybinds] = useState<Record<string, Spell>>({});
  const [spellToKey, setSpellToKey] = useState<Record<number, string>>({});
  const [isAssigning, setIsAssigning] = useState(false);

  const startAssigning = useCallback(() => setIsAssigning(true), []);
  const cancelAssigning = useCallback(() => setIsAssigning(false), []);

  const removeKeybind = useCallback((key: string) => {
    setKeybinds(prev => {
      const newKeybinds = { ...prev };
      delete newKeybinds[key];
      return newKeybinds;
    });
    setSpellToKey(prev => {
      const newSpellToKey = { ...prev };
      const spellId = keybinds[key]?.id;
      if (spellId) delete newSpellToKey[spellId];
      return newSpellToKey;

    });
  }, [keybinds]);

  const assignKeybind = useCallback((spell: Spell, key: string) => {
    setKeybinds(prev => {
      // Remove key from previous spell
      const newKeybinds = { ...prev };
      if (spellToKey[spell.id]) {
        delete newKeybinds[spellToKey[spell.id]];
      }
      // Remove key if it was bound to another spell
      Object.entries(newKeybinds).forEach(([k, sid]) => {
        if (k === key) delete newKeybinds[k];
      });
      // Add new binding
      newKeybinds[key] = spell;
      return newKeybinds;
    });

    setSpellToKey(prev => {
      const newSpellToKey = { ...prev };
      // Remove previous key for this spell
      if (newSpellToKey[spell.id]) {
        delete newSpellToKey[spell.id];
      }
      // Remove spell that had this key
      Object.entries(newSpellToKey).forEach(([sid, k]) => {
        if (k === key) delete newSpellToKey[Number(sid)];
      });
      // Add new mapping
      newSpellToKey[spell.id] = key;
      return newSpellToKey;
    });

    return spell;
  }, [spellToKey]);

  return (
    <KeybindContext.Provider 
      value={{ 
        keybinds, 
        spellToKey,
        isAssigning, 
        startAssigning, 
        cancelAssigning, 
        assignKeybind,
        removeKeybind
      }}
    >
      {children}
    </KeybindContext.Provider>
  );
};

export const useKeybinds = () => {
  const context = useContext(KeybindContext);
  if (!context) throw new Error('useKeybinds must be used within KeybindProvider');
  return context;
};