/**
 * Calculate Return on Investment in years
 * @param systemCost - Total system cost in VND
 * @param monthlySavings - Monthly electricity savings in VND
 * @returns ROI period in years
 */
export function calculateROI(systemCost: number, monthlySavings: number): number {
    if (monthlySavings <= 0) return Infinity;
    const annualSavings = monthlySavings * 12;
    return systemCost / annualSavings;
}

/**
 * Calculate annual energy generation
 * @param systemSizeKwp - System size in kWp
 * @param ghi - Global Horizontal Irradiation (kWh/m²/year)
 * @param performanceRatio - System performance ratio (default 0.75)
 * @returns Annual energy generation in kWh/year
 */
export function calculateAnnualGeneration(
    systemSizeKwp: number,
    ghi: number,
    performanceRatio: number = 0.75
): number {
    return systemSizeKwp * ghi * performanceRatio;
}

/**
 * Calculate monthly savings from solar system
 * @param annualGeneration - Annual energy generation in kWh
 * @param electricityPrice - Price per kWh in VND
 * @returns Monthly savings in VND
 */
export function calculateMonthlySavings(
    annualGeneration: number,
    electricityPrice: number
): number {
    return (annualGeneration / 12) * electricityPrice;
}
