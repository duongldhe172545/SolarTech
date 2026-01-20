// Solar energy constants
export const SOLAR = {
    // Default values
    DEFAULT_GHI: 1450, // kWh/m²/year for Vietnam average

    // Regional GHI ranges (Vietnam)
    REGIONS: {
        SOUTH: { min: 1750, max: 1850, name: 'Miền Nam' }, // lat < 12
        CENTRAL: { min: 1600, max: 1700, name: 'Miền Trung' }, // 12 <= lat < 17  
        NORTH: { min: 1350, max: 1450, name: 'Miền Bắc' }, // lat >= 17
    },

    // Conversion factors
    DAYS_PER_YEAR: 365,

    // System performance
    PERFORMANCE_RATIO: 0.75,
} as const;
