export interface AddressResult {
    display_name: string;
    lat: string;
    lon: string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface SolarData {
    ghi: number; // Global Horizontal Irradiation (kWh/m2/year)
    averageSunHours: number; // Average peak sun hours per day
}

export interface Quotation {
    systemSizeKw: number;
    estimatedPrice: number;
    monthlySavings: number;
    roiYears: number;
    packageType: 'SAVER' | 'STANDARD' | 'PREMIUM';
}

export interface CalculatorState {
    monthlyBill: number;
    usageHours: number; // 0 to 100% slider
    electricityType: string;
    phase: string;
    battery: string;
}
