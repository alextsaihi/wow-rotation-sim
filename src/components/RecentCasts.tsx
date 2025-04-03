// src/components/RecentCasts.tsx
import React from 'react';
import { Box, Typography, Stack, Avatar } from '@mui/material';
import { useRecentCasts } from '../contexts/RecentCastsContext';

const RecentCasts: React.FC = () => {
  const { recentCasts } = useRecentCasts();

  return (
    <Box sx={{ 
      p: 2, 
      border: '1px solid #3a2c1b', 
      borderRadius: 1,
      bgcolor: '#1a1a1a'
    }}>
      <Typography variant="subtitle1" color="#ffd100" gutterBottom>
        Recent Casts
      </Typography>
      <Stack direction="row" spacing={1} sx={{ overflowX: 'auto' }}>
        {recentCasts.map((spell, index) => (
          <Box
          key={index}
          component="img"
          src={spell.icon}
          alt={spell.name}
          sx={{
            width: 40,
            height: 40,
            border: '1px solid #3a2c1b',
            bgcolor: '#000000',
            borderRadius: 0, // Sharp corners
            objectFit: 'cover', // Ensures image fills container
            display: 'block', // Removes any inline spacing
            cursor: 'help', // Changes cursor on hover
          }}
          title={spell.name}
        />
      ))}
      </Stack>
    </Box>
  );
};

export default RecentCasts;