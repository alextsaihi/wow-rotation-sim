// src/components/SpellCard.tsx
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import { Spell } from '../types';

export default function SpellCard({ spell }: { spell: Spell }) {
  return (
    <Card sx={{ 
      maxWidth: 250,
      background: 'linear-gradient(145deg, #1a1a1a, #0d0d0d)',
      border: '1px solid #3a2c1b'
    }}>
      <CardContent>
        {/* Icon + Name Row */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          {spell.icon && (
            <Box
              component="img"
              src={spell.icon}
              alt={spell.name}
              sx={{
                width: 40,
                height: 40,
                border: '2px solid #3a2c1b',
                borderRadius: '4px',
                objectFit: 'contain'
              }}
            />
          )}
          <Typography variant="h6" color="goldenrod">
            {spell.name}
          </Typography>
        </Stack>

        {/* Spell Details */}
        <Box sx={{ pl: spell.icon ? 7 : 0 }}> {/* Adjust padding if icon exists */}
          <Typography variant="body2" color="lightgray">
            {spell.description || 'No description available'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}