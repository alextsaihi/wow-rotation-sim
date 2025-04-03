// src/contexts/RecentCastsContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { Spell } from '../types';

interface RecentCastsContextType {
  recentCasts: Spell[];
  addRecentCast: (spell: Spell) => void;
  clearRecentCasts: () => void;
}

const RecentCastsContext = createContext<RecentCastsContextType | undefined>(undefined);

export const RecentCastsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recentCasts, setRecentCasts] = useState<Spell[]>([]);

  const addRecentCast = (spell: Spell) => {
    setRecentCasts(prev => [spell, ...prev.slice(0, 9)]); // Keep latest 10
  };

  const clearRecentCasts = () => setRecentCasts([]);

  return (
    <RecentCastsContext.Provider value={{ recentCasts, addRecentCast, clearRecentCasts }}>
      {children}
    </RecentCastsContext.Provider>
  );
};

export const useRecentCasts = () => {
  const context = useContext(RecentCastsContext);
  if (!context) throw new Error('useRecentCasts must be used within RecentCastsProvider');
  return context;
};