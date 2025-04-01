// src/App.tsx
import { useEffect, useState } from 'react';
import { getSpell } from './services/blizzardApi';
import SpellCard from './components/SpellCard';
import { Grid, Container, LinearProgress, Alert } from '@mui/material';
import { Spell } from './types';  

export default function App() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSpells() {
      try {
        console.log('Using client ID:', import.meta.env.VITE_BLIZZARD_CLIENT_ID);
        const spellIds = [259489, 186270]; // Kill Command, Raptor Strike
        const spellPromises = spellIds.map(id => getSpell(id));
        const spellResults = await Promise.all(spellPromises);
        setSpells(spellResults);
      } catch (err) {
        setError('Failed to load spell data. Please check your credentials.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadSpells();
  }, []);

  if (loading) return <LinearProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        {spells.map((spell: Spell) => (  // Explicitly type the spell parameter
          <Grid key={spell.id}>
            <SpellCard spell={spell} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}