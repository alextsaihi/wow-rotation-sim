// src/services/blizzardApi.ts
import axios from 'axios';
import { Spell } from '../types.ts';

const API_BASE = import.meta.env.VITE_BLIZZARD_API_BASE;
const CLIENT_ID = import.meta.env.VITE_BLIZZARD_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_BLIZZARD_CLIENT_SECRET;
const BEARER_TOKEN = import.meta.env.VITE_BLIZZARD_BEARER_TOKEN;

let accessToken = '';

const getNamespace = () => {
	const region = import.meta.env.VITE_BLIZZARD_REGION || 'us';
	return `static-${region}-11.1.0`;
  };

export async function getToken() {
    const response = await axios.post(
        'https://us.battle.net/oauth/token',
        new URLSearchParams({ grant_type: 'client_credentials' }),
        {
            auth: {
                username: CLIENT_ID,
                password: CLIENT_SECRET
            }
        }
    );
    accessToken = response.data.access_token;
	console.log('Access token:', accessToken); // Log the access token for debugging
}

export async function getSpell(spellId: number): Promise<Spell> {
    if (!accessToken) await getToken();

	const namespace = getNamespace();
    
	try {
		const spellResponse = await axios.get(`${API_BASE}/data/wow/spell/${spellId}`, {
			params: {
				namespace,
				locale: 'en_US',
			},
			headers: {
				'Authorization': `Bearer ${BEARER_TOKEN}`			
			}
		});

		const mediaHref = spellResponse.data.media?.key?.href;
		let iconUrl = '';

		if (mediaHref) {
			const mediaResponse = await axios.get(mediaHref, {
				params: { access_token: accessToken }
			});
			iconUrl = mediaResponse.data.assets?.[0]?.value || '';
		}

		return {
			id: spellId,
			name: spellResponse.data.name,
			cooldown: spellResponse.data.cooldown?.cooldown_duration / 1000,
			castTime: spellResponse.data.cast_time?.cast_time / 1000,
			icon: iconUrl
		};
	} catch (error) {
		console.error('Error fetching spell data:', error);
		throw new Error('Failed to fetch spell data');
	}
}
