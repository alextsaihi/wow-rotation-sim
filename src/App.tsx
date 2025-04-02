// src/App.tsx
import { useEffect, useState } from 'react';
import { getSpell } from './services/blizzardApi';
import SpellBook from './components/SpellBook';
import { Container, LinearProgress, Alert } from '@mui/material';
import { Spell } from './types';

const API_BASE = import.meta.env.VITE_BLIZZARD_API_BASE;

export default function App() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSpells() {
      try {
        const spellIds = [259489, 186270]; // Kill Command, Raptor Strike
        const spellPromises = spellIds.map(id => getSpell(id));
        const spellResults = await Promise.all(spellPromises);
        
        // Enhance spells with icon URLs if not already included
        const enhancedSpells = await Promise.all(
          spellResults.map(async spell => ({
            ...spell,
            iconUrl: spell.icon || await fetchIconUrl(spell.id)
          }))
        );
        
        setSpells(enhancedSpells);
      } catch (err) {
        setError('Failed to load spell data. Please check your credentials and network connection.');
        console.error('Spell loading error:', err);
      } finally {
        setLoading(false);
      }
    }

    // Helper function to fetch icon if not in initial response
    async function fetchIconUrl(spellId: number): Promise<string | undefined> {
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
  }, []);

  if (loading) return <LinearProgress sx={{ width: '100%' }} />;
  if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ 
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <SpellBook spells={spells} />
    </Container>
  );
}