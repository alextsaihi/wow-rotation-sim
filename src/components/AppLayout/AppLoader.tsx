// src/components/AppLayout/AppLoader.tsx
import { LinearProgress, Alert } from '@mui/material';

interface AppLoaderProps {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
}

export default function AppLoader({ loading, error, children }: AppLoaderProps) {
  if (loading) return <LinearProgress sx={{ width: '100%' }} />;
  if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
  return <>{children}</>;
}