// src/App.tsx
import { KeybindProvider } from './contexts/KeybindContext';
import { RecentCastsProvider } from './contexts/RecentCastsContext';
import AppSpellLoader from './components/AppLayout/AppSpellLoader';
import { useSpellCasting } from './hooks/useSpellCasting';

// Create a separate component to use the hook SAFELY
const SpellCastingInitializer = () => {
  useSpellCasting(); // ✅ Now runs INSIDE providers
  return null; // Or return <AppSpellLoader /> if needed
};

export default function App() {
  return (
    <KeybindProvider>
      <RecentCastsProvider>
        <SpellCastingInitializer /> {/* Initialize hook here */}
        <AppSpellLoader />
      </RecentCastsProvider>
    </KeybindProvider>
  );
}