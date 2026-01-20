import type { Quotation, SolarData } from '../../types';
import { PRICING } from '../../constants';
import { calculateAnnualGeneration, calculateMonthlySavings, calculateROI } from './solar';

interface PackageCalculationInput {
    name: string;
    kwp: number;
    type: Quotation['packageType'];
    features: { text: string; tooltip: string }[];
    area: number;
    monthlyBill: number;
    solarData: SolarData;
}

interface PackageCalculationResult {
    name: string;
    kwp: number;
    price: number;
    monthlySavings: number;
    roi: number;
    type: Quotation['packageType'];
    features: { text: string; tooltip: string }[];
    fitsRoof: boolean;
}

/**
 * Calculate pricing package details
 * @param input - Package configuration and user data
 * @returns Calculated package with price, savings, ROI
 */
export function calculatePackage(input: PackageCalculationInput): PackageCalculationResult {
    const { kwp, area, solarData } = input;

    const annualGeneration = calculateAnnualGeneration(kwp, solarData.ghi, PRICING.PERFORMANCE_RATIO);
    const monthlySavings = calculateMonthlySavings(annualGeneration, PRICING.ELECTRICITY_PRICE_AVG);
    const systemCost = kwp * PRICING.PRICE_PER_KWP;
    const roi = calculateROI(systemCost, monthlySavings);
    const maxKwpForRoof = area / PRICING.SQM_PER_KWP;

    return {
        name: input.name,
        kwp: Math.round(kwp * 10) / 10,
        price: systemCost,
        monthlySavings: Math.round(monthlySavings),
        roi: Math.round(roi * 10) / 10,
        type: input.type,
        features: input.features,
        fitsRoof: kwp <= maxKwpForRoof
    };
}

/**
 * Calculate needed system size based on electricity bill
 * @param monthlyBill - Monthly electricity bill in VND
 * @param ghi - Global Horizontal Irradiation
 * @returns Recommended system size in kWp
 */
export function calculateNeededSystemSize(monthlyBill: number, ghi: number): number {
    const monthlyKwhNeeded = monthlyBill / PRICING.ELECTRICITY_PRICE_AVG;
    const annualKwhNeeded = monthlyKwhNeeded * 12;
    const yieldPerKwp = ghi * PRICING.PERFORMANCE_RATIO;
    return annualKwhNeeded / yieldPerKwp;
}
