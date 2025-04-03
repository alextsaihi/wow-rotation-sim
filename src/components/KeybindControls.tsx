// src/components/KeybindControls.tsx
import React from 'react';
import { Button, Box, Typography, Chip } from '@mui/material';
import { useKeybinds } from '../contexts/KeybindContext';
import { Spell } from '../types';

const KeybindControls: React.FC = () => {
  const { 
    isAssigning, 
    startAssigning, 
    cancelAssigning,
    keybinds,
    removeKeybind
  } = useKeybinds();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: 2,
      mb: 3,
      p: 2,
      borderBottom: '1px solid #3a2c1b',
      width: '100%'
    }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button
          variant="outlined"
          onClick={isAssigning ? cancelAssigning : startAssigning}
          sx={{
            borderColor: isAssigning ? '#ff3333' : '#3a2c1b',
            color: isAssigning ? '#ff3333' : '#ffd100',
            '&:hover': {
              borderColor: isAssigning ? '#ff3333' : '#ffd100'
            }
          }}
        >
          {isAssigning ? 'Cancel Assignment (Esc)' : 'Assign Keybinds'}
        </Button>

        <Typography variant="body2" color="#ffd100">
          {isAssigning ? 'Click a spell, then press a key' : 'Current keybinds:'}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {Object.entries(keybinds).map(([key, spell]) => (
          <Chip
            key={key}
            label={`${key.replace('Key', '').replace('Digit', '')} → ${spell.name}`}
            onDelete={() => removeKeybind(key)}
            sx={{
              bgcolor: '#1a1a1a',
              color: '#ffd100',
              border: '1px solid #3a2c1b',
              '& .MuiChip-deleteIcon': {
                color: '#ffd100'
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default KeybindControls;