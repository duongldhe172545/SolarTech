import type { AddressResult } from '../../types';

/**
 * Geocoding API service using OpenStreetMap Nominatim
 * Rate limit: 1 request/second
 */
export const geocodingApi = {
    /**
     * Search for addresses by query string
     * @param query - Search query (minimum 3 characters)
     * @returns Array of address results
     */
    searchAddress: async (query: string): Promise<AddressResult[]> => {
        if (!query || query.length < 3) return [];

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=vn`,
                {
                    headers: {
                        'Accept-Language': 'vi-VN'
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Geocoding API error: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Geocoding error:', error);
            return [];
        }
    }
};
