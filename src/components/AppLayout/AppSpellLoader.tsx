// src/components/AppLayout/AppSpellLoader.tsx
import { Container } from '@mui/material';
import useSpellData from '../../hooks/useSpellData';
import AppLoader from './AppLoader';
import SpellBook from '../SpellBook';
import KeybindControls from '../KeybindControls';
import RecentCasts from '../RecentCasts';

const SPELL_IDS = [259489, 186270]; // Kill Command, Raptor Strike

export default function AppSpellLoader() {
  const { spells, loading, error } = useSpellData(SPELL_IDS);

  return (
    <Container maxWidth="lg" sx={{ 
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      gap: 3
    }}>
      <AppLoader loading={loading} error={error}>
        <KeybindControls />
        <RecentCasts />
        <SpellBook spells={spells} />
      </AppLoader>
    </Container>
  );
}