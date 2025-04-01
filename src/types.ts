// src/types.ts
export interface Spell {
    id: number;
    name: string;
    icon?: string;
    cooldown?: number;
    castTime?: number;
    power?: number;
  }