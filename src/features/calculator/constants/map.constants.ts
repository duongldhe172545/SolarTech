// Map configuration constants
export const MAP = {
    // Default center (Hanoi)
    DEFAULT_CENTER: { lat: 21.028511, lng: 105.804817 },

    // Zoom levels
    DEFAULT_ZOOM: 20,
    MAX_ZOOM: 22,

    // Tile layer
    TILE_LAYER: {
        URL: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        ATTRIBUTION: '&copy; Esri',
    },

    // Leaflet CDN
    LEAFLET_ICONS: {
        RETINA: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        NORMAL: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        SHADOW: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    },

    // Earth radius for calculations
    EARTH_RADIUS_METERS: 6378137,

    // Drawing colors
    COLORS: {
        DRAWING: '#3b82f6', // blue
        CONFIRMED: '#10b981', // green
    },
} as const;
