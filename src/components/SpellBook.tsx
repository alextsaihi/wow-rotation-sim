// src/components/SpellBook.tsx

import React, { useState, useEffect } from 'react';
import { Box, Paper, Tooltip } from '@mui/material';
import { useKeybinds } from '../contexts/KeybindContext';
import SpellCard from './SpellCard';
import { Spell } from '../types';

const SpellBook: React.FC<{ spells: Spell[] }> = ({ spells }) => {
  const { isAssigning, assignKeybind, spellToKey } = useKeybinds();
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);

  // Handle key assignment
  useEffect(() => {
    if (!isAssigning || !selectedSpell) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code.startsWith('Key') || e.code.startsWith('Digit')) {
        assignKeybind(selectedSpell, e.code);
        setSelectedSpell(null); // Reset after assignment
      }
      if (e.key === 'Escape') {
        setSelectedSpell(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAssigning, selectedSpell, assignKeybind]);

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      p: 3
    }}>
      {/* Spell Icons */}
      <Box sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {spells.map((spell) => (
          <Tooltip 
            key={spell.id}
            title={<SpellCard spell={spell} />}
            placement="top"
            arrow
          >
            <Paper
              onClick={() => isAssigning && setSelectedSpell(spell)}

              sx={{
                width: 56,
                height: 56,
                background: spell.icon 
                  ? `url(${spell.icon}) center/contain no-repeat, #1a1a1a`
                  : '#1a1a1a',
                border: '2px solid #3a2c1b',
                borderRadius: 1,
                cursor: 'pointer',
                position: 'relative',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 0 10px rgba(255, 209, 0, 0.5)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              {/* Keybind Badge */}
              {spellToKey[spell.id] && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -8,
                    right: -8,
                    bgcolor: '#3a2c1b',
                    color: '#ffd100',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    border: '1px solid #ffd100'
                  }}
                >
                  {spellToKey[spell.id].replace('Key', '').replace('Digit', '')}
                </Box>
              )}
            </Paper>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default SpellBook;