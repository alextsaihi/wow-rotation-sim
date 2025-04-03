// src/hooks/useSpellData.ts
import { useState, useEffect } from 'react';
import { getSpell } from '../services/blizzardApi';
import { Spell } from '../types';

export default function useSpellData(spellIds: number[]) {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_BLIZZARD_API_BASE;
  useEffect(() => {
    async function loadSpells() {
      try {
        const spellPromises = spellIds.map(id => getSpell(id));
        const spellResults = await Promise.all(spellPromises);
        
        const enhancedSpells = await Promise.all(
          spellResults.map(async spell => ({
            ...spell,
            iconUrl: spell.icon || await fetchIconUrl(spell.id)
          }))
        );
        
        setSpells(enhancedSpells);
      } catch (err) {
        setError('Failed to load spell data.');
        console.error('Spell loading error:', err);
      } finally {
        setLoading(false);
      }
    }

    async function fetchIconUrl(spellId: number) {
      // ... (same icon fetch logic as before)
      try {
        const response = await fetch(
          `${API_BASE}/data/wow/media/spell/${spellId}?namespace=static-us&locale=en_US`,
          {
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_BLIZZARD_BEARER_TOKEN}`
            }
          }
        );
        const data = await response.json();
        return data.assets?.[0]?.value;
      } catch (err) {
        console.warn(`Couldn't fetch icon for spell ${spellId}:`, err);
        return undefined;
      }
    }
    
    loadSpells();
  }, [spellIds]);

  return { spells, loading, error };
}