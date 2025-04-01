// src/components/SpellCard.tsx
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { Spell } from '../types.ts';

export default function SpellCard({ spell }: { spell: Spell }) {
  return (
    <Card sx={{ 
      maxWidth: 200,
      background: 'linear-gradient(145deg, #1a1a1a, #0d0d0d)',
      border: '1px solid #3a2c1b'
    }}>
      <CardContent>
        <Typography variant="h6" color="goldenrod">
          {spell.name}
        </Typography>
        <Typography variant="body2" color="lightgray">
          ID: {spell.id}
        </Typography>
        <Typography variant="body2" color="lightgray">
          Cooldown: {spell.cooldown || 'None'}s
        </Typography>
      </CardContent>
    </Card>
  );
}