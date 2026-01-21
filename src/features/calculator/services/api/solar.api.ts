import type { SolarData } from '../../types';
import { SOLAR } from '../../constants';

/**
 * Fetch solar data from NASA POWER API
 * https://power.larc.nasa.gov/docs/services/api/
 */
const fetchNASAPower = async (lat: number, lng: number): Promise<SolarData> => {
    // Get last year's data
    const end = new Date();
    const start = new Date();
    start.setFullYear(end.getFullYear() - 1);

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    };

    const url = `https://power.larc.nasa.gov/api/temporal/daily/point` +
        `?start=${formatDate(start)}` +
        `&end=${formatDate(end)}` +
        `&latitude=${lat}` +
        `&longitude=${lng}` +
        `&parameters=ALLSKY_SFC_SW_DWN` + // Global Horizontal Irradiance
        `&community=RE` + // Renewable Energy
        `&format=JSON`;

    console.log('Fetching NASA POWER data:', url);

    const response = await fetch(url, {
        signal: AbortSignal.timeout(10000) // 10s timeout
    });

    if (!response.ok) {
        throw new Error(`NASA POWER API error: ${response.status}`);
    }

    const data = await response.json();

    // NASA POWER uses -999.0 as fill value for missing data
    const FILL_VALUE = -999.0;

    // Extract daily GHI values (ALLSKY_SFC_SW_DWN is in kWh/m²/day)
    const allDailyValues: number[] = Object.values(data.properties.parameter.ALLSKY_SFC_SW_DWN);

    // Filter out missing data (fill values)
    const validValues = allDailyValues.filter(val => val > 0 && val !== FILL_VALUE);

    if (validValues.length === 0) {
        throw new Error('No valid solar data available for this location');
    }

    // Calculate average from valid values only
    const avgDailyGHI = validValues.reduce((sum, val) => sum + val, 0) / validValues.length;

    // Annual GHI = average daily * 365
    const annualGHI = avgDailyGHI * 365;

    // Bias correction: NASA POWER tends to underestimate by ~1.1 MJ/m²/day (~0.3 kWh/m²/day)
    // Apply 5% correction factor
    const BIAS_CORRECTION = 1.05;
    const correctedAnnualGHI = annualGHI * BIAS_CORRECTION;

    console.log(`📊 NASA POWER Stats: ${validValues.length}/${allDailyValues.length} valid days, avg: ${avgDailyGHI.toFixed(2)} kWh/m²/day`);

    return {
        ghi: Math.round(correctedAnnualGHI),
        averageSunHours: parseFloat(avgDailyGHI.toFixed(2)) // kWh/m²/day = hours of peak sun
    };
};

/**
 * Fallback: Simulated solar data based on Vietnam regions
 */
const simulatedSolarData = (lat: number, lng: number): SolarData => {
    let simulatedGhi = SOLAR.DEFAULT_GHI;

    if (lat < 12) {
        // South Vietnam
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
};

/**
 * Solar data API service
 * Uses NASA POWER API with fallback to simulated data
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

            // Try NASA POWER API first
            const data = await fetchNASAPower(lat, lng);

            console.log('✅ NASA POWER data received:', data);
            return data;

        } catch (error) {
            console.warn('⚠️ NASA POWER API failed, using simulated data:', error);

            // Fallback to simulated data
            const data = simulatedSolarData(lat, lng);
            console.log('📊 Using simulated data:', data);
            return data;
        }
    }
};
