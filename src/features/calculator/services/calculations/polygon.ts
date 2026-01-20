import type { Coordinates } from '../../types';
import { MAP } from '../../constants';

/**
 * Calculate the area of a polygon using the Shoelace formula
 * adapted for spherical coordinates (latitude/longitude)
 * @param coords - Array of polygon vertices
 * @returns Area in square meters
 */
export function calculatePolygonArea(coords: Coordinates[]): number {
    if (coords.length < 3) return 0;

    const R = MAP.EARTH_RADIUS_METERS;
    let area = 0;

    for (let i = 0; i < coords.length; i++) {
        const j = (i + 1) % coords.length;

        const p1 = coords[i];
        const p2 = coords[j];

        // Convert to radians
        const lat1 = (p1.lat * Math.PI) / 180;
        const lat2 = (p2.lat * Math.PI) / 180;
        const lng1 = (p1.lng * Math.PI) / 180;
        const lng2 = (p2.lng * Math.PI) / 180;

        // Spherical excess approximation
        area += (lng2 - lng1) * (2 + Math.sin(lat1) + Math.sin(lat2));
    }

    area = (area * R * R) / 2.0;
    return Math.abs(area);
}

/**
 * Calculate distance between two points using Haversine formula
 * @param lat1 - Latitude of point 1
 * @param lng1 - Longitude of point 1
 * @param lat2 - Latitude of point 2
 * @param lng2 - Longitude of point 2
 * @returns Distance in meters
 */
/**
 * Calculate distance between two points using Haversine formula
 * @param lat1 - Latitude of point 1
 * @param lng1 - Longitude of point 1
 * @param lat2 - Latitude of point 2
 * @param lng2 - Longitude of point 2
 * @returns Distance in meters
 */
export function calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
): number {
    const R = MAP.EARTH_RADIUS_METERS;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lng2 - lng1) * Math.PI) / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Calculate the perimeter of a polygon
 * @param coords - Array of polygon vertices
 * @returns Perimeter in meters
 */
export function calculatePolygonPerimeter(coords: Coordinates[]): number {
    if (coords.length < 2) return 0;

    let perimeter = 0;
    for (let i = 0; i < coords.length; i++) {
        const j = (i + 1) % coords.length;
        perimeter += calculateDistance(
            coords[i].lat,
            coords[i].lng,
            coords[j].lat,
            coords[j].lng
        );
    }

    return perimeter;
}
