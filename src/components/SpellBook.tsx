// src/components/SpellBook.tsx
import React, { useState, useEffect } from 'react';
import { Box, Paper, Tooltip } from '@mui/material';
import { useKeybinds } from '../contexts/KeybindContext';
import { useRecentCasts } from '../contexts/RecentCastsContext';
import SpellCard from './SpellCard';
import { Spell } from '../types';

const SpellBook: React.FC<{ spells: Spell[] }> = ({ spells }) => {
  const { isAssigning, assignKeybind, spellToKey } = useKeybinds();
  const { addRecentCast } = useRecentCasts();
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);

  // Handle key assignment
  useEffect(() => {
    if (!isAssigning || !selectedSpell) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code.startsWith('Key') || e.code.startsWith('Digit')) {
        assignKeybind(selectedSpell, e.code);
        addRecentCast(selectedSpell); // Add to recent casts when assigned
        setSelectedSpell(null); // Reset selection
      }
      if (e.key === 'Escape') {
        setSelectedSpell(null); // Cancel selection without assigning
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAssigning, selectedSpell, assignKeybind, addRecentCast]);

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
              onClick={() => {
                if (isAssigning) {
                  setSelectedSpell(spell);
                  console.log(`Selected ${spell.name} for key assignment`);
                }
              }}
              sx={{
                width: 56,
                height: 56,
                background: spell.icon 
                  ? `url(${spell.icon}) center/contain no-repeat, #1a1a1a`
                  : '#1a1a1a',
                border: selectedSpell?.id === spell.id 
                  ? '2px solid #ffd100' 
                  : '2px solid #3a2c1b',
                borderRadius: 1,
                cursor: 'pointer',
                position: 'relative',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: selectedSpell?.id === spell.id
                    ? '0 0 15px rgba(255, 209, 0, 0.8)'
                    : '0 0 10px rgba(255, 209, 0, 0.5)'
                },
                transition: 'all 0.2s ease',
                opacity: isAssigning && !selectedSpell ? 1 : 1,
                filter: selectedSpell && selectedSpell.id !== spell.id 
                  ? 'brightness(0.5)' 
                  : 'none'
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

      {/* Assignment Status Indicator */}
      {selectedSpell && (
        <Box sx={{
          mt: 2,
          color: '#ffd100',
          textAlign: 'center'
        }}>
          Press any key to bind {selectedSpell.name} or ESC to cancel
        </Box>
      )}
    </Box>
  );
};

export default SpellBook;