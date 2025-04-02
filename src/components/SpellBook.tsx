// src/components/SpellBook.tsx
import React from 'react';
import { Box, Paper, Tooltip } from '@mui/material';
import SpellCard from './SpellCard';
import { Spell } from '../types';

const SpellBook: React.FC<{ spells: Spell[] }> = ({ spells }) => {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      p: 3
    }}>
      {/* Spell Icons Row */}
      <Box sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '800px'
      }}>
        {spells.map((spell) => (
          <Tooltip 
            key={spell.id}
            title={<SpellCard spell={spell} />}
            placement="top"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  backgroundColor: 'transparent',
                  padding: 0,
                  boxShadow: 'none'
                }
              },
              arrow: {
                sx: {
                  color: '#3a2c1b'
                }
              }
            }}
          >
            <Paper
              elevation={3}
              sx={{
                width: 56,
                height: 56,
                background: spell.icon 
                  ? `url(${spell.icon}) center/contain no-repeat`
                  : '#1a1a1a',
                border: '2px solid #3a2c1b',
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 0 10px rgba(255, 209, 0, 0.5)'
                },
                transition: 'all 0.2s ease'
              }}
            />
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default SpellBook;