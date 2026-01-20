import type { SolarData } from '../../types';
import { SOLAR } from '../../constants';

/**
 * Solar data API service
 * Currently using simulated data based on Vietnam regional heuristics
 * TODO: Replace with real Global Solar Atlas API when available
 */
export const solarApi = {
    /**
     * Fetch solar radiation data for given coordinates
     * @param lat - Latitude
     * @param lng - Longitude  
     * @returns Solar data including GHI and average sun hours
     */
    fetchSolarData: async (lat: number, lng: number): Promise<SolarData> => {
        try {
            console.log(`Fetching solar data for coordinates: ${lat}, ${lng}`);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // Determine region based on latitude (Vietnam-specific)
            let simulatedGhi = SOLAR.DEFAULT_GHI;

            if (lat < 12) {
                // South Vietnam - highest solar radiation
                simulatedGhi = SOLAR.REGIONS.SOUTH.min + (Math.random() * (SOLAR.REGIONS.SOUTH.max - SOLAR.REGIONS.SOUTH.min));
            } else if (lat >= 12 && lat < 17) {
                // Central Vietnam
                simulatedGhi = SOLAR.REGIONS.CENTRAL.min + (Math.random() * (SOLAR.REGIONS.CENTRAL.max - SOLAR.REGIONS.CENTRAL.min));
            } else {
                // North Vietnam
                simulatedGhi = SOLAR.REGIONS.NORTH.min + (Math.random() * (SOLAR.REGIONS.NORTH.max - SOLAR.REGIONS.NORTH.min));
            }

            return {
                ghi: Math.round(simulatedGhi),
                averageSunHours: parseFloat((simulatedGhi / SOLAR.DAYS_PER_YEAR).toFixed(2))
            };
        } catch (error) {
            console.error('Solar API Error (Falling back to default):', error);
            return {
                ghi: SOLAR.DEFAULT_GHI,
                averageSunHours: parseFloat((SOLAR.DEFAULT_GHI / SOLAR.DAYS_PER_YEAR).toFixed(2))
            };
        }
    }
};

/**
 * Future real API implementation example:
 * 
 * export const solarApi = {
 *   fetchSolarData: async (lat: number, lng: number): Promise<SolarData> => {
 *     const response = await fetch(
 *       `https://api.globalsolaratlas.info/data/lta?loc=${lat},${lng}`,
 *       { headers: { 'Authorization': `Bearer ${process.env.SOLAR_API_KEY}` } }
 *     );
 *     return response.json();
 *   }
 * };
 */
