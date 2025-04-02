// src/services/blizzardApi.ts
import axios from 'axios';
import { Spell } from '../types.ts';

const API_BASE = import.meta.env.VITE_BLIZZARD_API_BASE;
const CLIENT_ID = import.meta.env.VITE_BLIZZARD_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_BLIZZARD_CLIENT_SECRET;
const BEARER_TOKEN = import.meta.env.VITE_BLIZZARD_BEARER_TOKEN;
const NAMESPACE ='static-us';

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
}

export async function getSpell(spellId: number): Promise<Spell> {
    if (!accessToken) await getToken();

    
	try {
		const spellResponse = await axios.get(`${API_BASE}/data/wow/spell/${spellId}`, {
			params: {
				namespace: NAMESPACE,
				locale: 'en_US',
			},
			headers: {
				'Authorization': `Bearer ${accessToken}`			
			}
		});

		const mediaHref = spellResponse.data.media?.key?.href;
		let iconUrl = '';
		let fileDataId = 0;

		if (mediaHref) {
			const mediaResponse = await axios.get(mediaHref, {
				headers: {
					'Authorization': `Bearer ${accessToken}`
				}
			});
			iconUrl = mediaResponse.data.assets?.[0]?.value || '';
			fileDataId = mediaResponse.data.assets?.[0]?.id || 0;
		}

		return {
			id: spellId,
			name: spellResponse.data.name,
			icon: iconUrl,
			iconId: fileDataId,
			description: spellResponse.data.description
		};
	} catch (error) {
		console.error('Error fetching spell data:', error);
		throw new Error('Failed to fetch spell data');
	}
}
