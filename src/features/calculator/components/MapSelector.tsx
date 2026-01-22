import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polygon, useMapEvents, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import type { AddressResult, Coordinates, SatelliteLayer } from '../types';
import { MousePointerClick, RefreshCw, Undo2, CheckCircle, Move, MapPin, Maximize, Ruler, Zap, ScanLine, ArrowRight, Layers } from 'lucide-react';
import { calculatePolygonArea, calculatePolygonPerimeter, calculateDistance } from '../services/calculations';
import 'leaflet/dist/leaflet.css';

// --- SATELLITE LAYER CONFIGURATIONS ---
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'; // Fallback to Mapbox demo token

const SATELLITE_LAYERS: SatelliteLayer[] = [
    {
        id: 'mapbox',
        name: 'Mapbox Satellite',
        url: `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.png?access_token=${MAPBOX_TOKEN}`,
        attribution: '© Mapbox © Maxar',
        maxZoom: 23,
        description: 'Độ phân giải cao, cập nhật thường xuyên'
    },
    {
        id: 'google-hybrid',
        name: 'Google Hybrid',
        url: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}',
        attribution: '© Google Maps',
        maxZoom: 22,
        description: 'Vệ tinh + nhãn địa điểm'
    },
    {
        id: 'google-satellite',
        name: 'Google Satellite',
        url: 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}',
        attribution: '© Google Maps',
        maxZoom: 22,
        description: 'Chỉ ảnh vệ tinh'
    },
    {
        id: 'esri',
        name: 'Esri World Imagery',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '© Esri © Maxar © GeoEye',
        maxZoom: 23,
        description: 'Dữ liệu từ nhiều vệ tinh'
    }
];

interface MapSelectorProps {
    initialCenter: Coordinates;
    address?: AddressResult | null;
    onAreaCalculated: (area: number) => void;
    onRetake: () => void;
}

// --- Helper Components ---

const DrawingEvents = ({
    isDrawing,
    onMapClick
}: {
    isDrawing: boolean;
    onMapClick: (e: L.LeafletMouseEvent) => void
}) => {
    useMapEvents({
        click: (e) => {
            if (isDrawing) {
                onMapClick(e);
            }
        },
    });
    return null;
};

const MapRecenter = ({ center }: { center: Coordinates }) => {
    const map = useMap();
    useEffect(() => {
        // Validation check to prevent Leaflet crash
        if (!center || typeof center.lat !== 'number' || typeof center.lng !== 'number' || isNaN(center.lat) || isNaN(center.lng)) {
            return;
        }
        // Fly to new center with high zoom for "sharp" look
        map.flyTo([center.lat, center.lng], 20, { animate: true, duration: 1.5 });
        // Invalidate size to ensure full rendering
        setTimeout(() => map.invalidateSize(), 500);
    }, [center, map]);
    return null;
};

const EdgeMeasurements = ({
    points,
    closed, // Whether the polygon is fully closed/confirmed
}: {
    points: Coordinates[];
    closed: boolean;
}) => {
    if (points.length < 2) return null;

    const markers: React.ReactNode[] = [];

    // Iterate through segments
    // If closed (or enough points to form a polygon), we measure all segments including the closing one
    const shouldClose = closed || points.length > 2;
    const count = shouldClose ? points.length : points.length - 1;

    for (let i = 0; i < count; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];

        const dist = calculateDistance(p1.lat, p1.lng, p2.lat, p2.lng);
        const centerLat = (p1.lat + p2.lat) / 2;
        const centerLng = (p1.lng + p2.lng) / 2;

        markers.push(
            <Marker
                key={`edge-${i}`}
                position={[centerLat, centerLng]}
                icon={L.divIcon({
                    className: 'bg-transparent',
                    html: `
              <div class="px-2 py-0.5 bg-slate-900/80 backdrop-blur-sm rounded text-[10px] font-bold text-white shadow-sm border border-slate-600/50 whitespace-nowrap transform -translate-x-1/2 -translate-y-1/2">
                ${dist.toFixed(1)}m
              </div>
            `,
                    // iconSize: [40, 20],
                })}
            />
        );
    }

    return <>{markers}</>;
};

// Draggable Marker for Polygon Vertices
interface VertexMarkerProps {
    position: Coordinates;
    index: number;
    onDrag: (index: number, lat: number, lng: number) => void;
}

const VertexMarker: React.FC<VertexMarkerProps> = ({
    position,
    index,
    onDrag
}) => {
    const markerRef = useRef<L.Marker>(null);

    const eventHandlers = useMemo(
        () => ({
            drag(e: L.LeafletEvent) {
                const marker = e.target;
                if (marker) {
                    const { lat, lng } = marker.getLatLng();
                    onDrag(index, lat, lng);
                }
            },
            mouseover(e: L.LeafletEvent) {
                e.target.openPopup();
            }
        }),
        [index, onDrag]
    );

    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={[position.lat, position.lng]}
            ref={markerRef}
            icon={L.divIcon({
                className: 'bg-transparent',
                // UX: Large hit area (40px) for easy grabbing, small visual dot
                html: `
              <div class="relative w-10 h-10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 group cursor-grab active:cursor-grabbing">
                <!-- Hover Glow -->
                <div class="absolute w-full h-full bg-blue-500/30 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <!-- The Visible Dot -->
                <div class="relative w-3.5 h-3.5 bg-white border-[3px] border-blue-600 rounded-full shadow-lg transition-transform duration-200 group-hover:scale-150 group-hover:border-amber-500 z-10"></div>
              </div>
            `,
                iconSize: [0, 0],
            })}
        />
    )
}

// --- Main Component ---

const MapSelector: React.FC<MapSelectorProps> = ({ initialCenter, address, onAreaCalculated, onRetake }) => {
    // State
    const [points, setPoints] = useState<Coordinates[]>([]);
    const [isDrawing, setIsDrawing] = useState(true);
    const [metrics, setMetrics] = useState({ area: 0, perimeter: 0, power: 0 });
    const [selectedLayer, setSelectedLayer] = useState<SatelliteLayer>(SATELLITE_LAYERS[0]); // Default to Mapbox

    // Safe initialization
    const [center, setCenter] = useState<Coordinates>(() => {
        if (initialCenter && !isNaN(initialCenter.lat) && !isNaN(initialCenter.lng)) {
            return initialCenter;
        }
        return { lat: 21.028511, lng: 105.804817 };
    });

    // Sync center when address prop changes
    useEffect(() => {
        if (address && address.lat && address.lon) {
            const lat = parseFloat(address.lat);
            const lng = parseFloat(address.lon);
            if (!isNaN(lat) && !isNaN(lng)) {
                setCenter({ lat, lng });
            }
        }
    }, [address]);

    // Leaflet Icon Fix
    useEffect(() => {
        const fixLeafletIcons = () => {
            try {
                // @ts-ignore
                delete L.Icon.Default.prototype._getIconUrl;
                L.Icon.Default.mergeOptions({
                    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                });
            } catch (e) { console.warn("Leaflet fix failed", e); }
        };
        fixLeafletIcons();
    }, []);

    // Real-time calculation
    useEffect(() => {
        if (points.length >= 3) {
            const area = calculatePolygonArea(points);
            const perimeter = calculatePolygonPerimeter(points);
            // Approx 1kWp requires ~6m2
            const power = area / 6;
            setMetrics({ area, perimeter, power });
        } else {
            setMetrics({ area: 0, perimeter: 0, power: 0 });
        }
    }, [points]);

    // Handlers
    const handleMapClick = (e: L.LeafletMouseEvent) => {
        if (!isDrawing) return;
        const newPoint = { lat: e.latlng.lat, lng: e.latlng.lng };
        setPoints((prev) => [...prev, newPoint]);
    };

    const handleDragVertex = (index: number, lat: number, lng: number) => {
        setPoints(prev => {
            const newPoints = [...prev];
            newPoints[index] = { lat, lng };
            return newPoints;
        });
    };

    const handleUndo = () => {
        setPoints((prev) => prev.slice(0, -1));
    };

    const handleReset = () => {
        setPoints([]);
        setIsDrawing(true);
        setMetrics({ area: 0, perimeter: 0, power: 0 });
        onAreaCalculated(0);
    };

    const handleConfirm = () => {
        if (metrics.area > 0) {
            setIsDrawing(false);
            onAreaCalculated(metrics.area);
        }
    };

    const handleEditAgain = () => {
        setIsDrawing(true);
        onAreaCalculated(0);
    };

    const previewPositions = points.map(p => [p.lat, p.lng] as [number, number]);
    const isPolygonClosed = points.length > 2;

    // Safe center for MapContainer
    const mapCenter: [number, number] =
        (!isNaN(center.lat) && !isNaN(center.lng))
            ? [center.lat, center.lng]
            : [21.028511, 105.804817];

    return (
        <div className="relative w-full h-full bg-[#0f172a] group isolate overflow-hidden font-sans">

            {/* MAP LAYER */}
            <div className="w-full h-full transition-transform duration-1000 ease-out group-hover:scale-[1.01] z-0">
                <MapContainer
                    center={mapCenter}
                    zoom={20}
                    scrollWheelZoom={false}
                    className="w-full h-full outline-none"
                    style={{ background: '#0f172a', height: '100%', width: '100%' }}
                >
                    <TileLayer
                        key={selectedLayer.id} // Force remount when layer changes
                        attribution={selectedLayer.attribution}
                        url={selectedLayer.url}
                        maxZoom={selectedLayer.maxZoom}
                    />

                    <MapRecenter center={center} />
                    <DrawingEvents isDrawing={isDrawing} onMapClick={handleMapClick} />

                    {/* Drawing Visualization */}
                    {points.length > 0 && (
                        <>
                            <Polygon
                                positions={previewPositions}
                                pathOptions={{
                                    color: isDrawing ? '#3b82f6' : '#10b981',
                                    fillColor: isDrawing ? '#3b82f6' : '#10b981',
                                    fillOpacity: 0.25,
                                    weight: 2,
                                }}
                            />

                            <Polyline
                                positions={isPolygonClosed ? [...previewPositions, previewPositions[0]] : previewPositions}
                                pathOptions={{ color: '#3b82f6', weight: 2, dashArray: '4,4', opacity: 0.8 }}
                            />

                            {isDrawing && points.map((p, idx) => (
                                <VertexMarker
                                    key={`${idx}-${p.lat}-${p.lng}`}
                                    index={idx}
                                    position={p}
                                    onDrag={handleDragVertex}
                                />
                            ))}

                            <EdgeMeasurements points={points} closed={!isDrawing && isPolygonClosed} />
                        </>
                    )}
                </MapContainer>
            </div>

            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* --- TOP CENTER TOOLBAR --- */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] flex gap-2">
                <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-lg p-1 flex items-center shadow-2xl">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider ${isDrawing ? 'bg-blue-600/20 text-blue-400' : 'text-gray-500'}`}>
                        <Ruler className="w-3.5 h-3.5" /> Chế độ đo đạc
                    </div>
                    <div className="w-[1px] h-4 bg-slate-700 mx-1"></div>

                    {/* Satellite Layer Switcher */}
                    <div className="relative group/layers">
                        <button
                            className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-2 text-blue-400 bg-blue-600/10 hover:bg-blue-600/20"
                            title="Chọn nguồn ảnh vệ tinh"
                        >
                            <Layers className="w-3.5 h-3.5" /> {selectedLayer.name}
                        </button>

                        {/* Dropdown Menu */}
                        <div className="absolute top-full left-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl opacity-0 invisible group-hover/layers:opacity-100 group-hover/layers:visible transition-all duration-200 min-w-[220px] z-50">
                            {SATELLITE_LAYERS.map((layer) => (
                                <button
                                    key={layer.id}
                                    onClick={() => setSelectedLayer(layer)}
                                    className={`w-full px-3 py-2.5 text-left text-xs hover:bg-slate-700 transition-colors first:rounded-t-lg last:rounded-b-lg border-b border-slate-700 last:border-0 ${selectedLayer.id === layer.id ? 'bg-blue-600/20 text-blue-400' : 'text-slate-300'
                                        }`}
                                >
                                    <div className="font-medium">{layer.name}</div>
                                    {layer.description && (
                                        <div className="text-[10px] text-slate-500 mt-0.5">{layer.description}</div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-[1px] h-4 bg-slate-700 mx-1"></div>
                    <button
                        onClick={handleReset}
                        className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 rounded-md transition-colors flex items-center gap-2"
                    >
                        <RefreshCw className="w-3.5 h-3.5" /> Vẽ lại
                    </button>
                </div>
            </div>

            {/* --- RIGHT PANEL: UNIFIED ANALYSIS DASHBOARD --- */}
            {/* This panel contains ALL metrics and actions, sitting parallel to the left-side input form */}
            {points.length >= 1 && (
                <div className="absolute top-24 right-6 w-[320px] z-[400] animate-in slide-in-from-right-10 duration-500 pointer-events-auto">
                    <div className="bg-[#0f172a]/90 backdrop-blur-xl border border-slate-600/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col">

                        {/* 1. Header */}
                        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-4 border-b border-slate-700 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-white">
                                <div className="p-1.5 bg-blue-600 rounded-md">
                                    <Zap className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-bold tracking-wide">Kết quả khảo sát</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                                <CheckCircle className="w-3 h-3" />
                                <span>AI Active</span>
                            </div>
                        </div>

                        {/* 2. Address */}
                        <div className="px-5 py-4 border-b border-slate-700/50 bg-slate-800/30">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Vị trí mái nhà</p>
                                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                                        {address?.display_name || "Chưa xác định địa chỉ"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 3. Metrics Grid (Unified) */}
                        <div className="grid grid-cols-2 gap-px bg-slate-700 border-b border-slate-700">
                            {/* Area */}
                            <div className="bg-[#0f172a]/80 p-4 hover:bg-slate-800/80 transition-colors group">
                                <div className="flex justify-between items-start mb-1">
                                    <p className="text-[10px] text-emerald-500 font-bold uppercase">Diện tích</p>
                                    <Maximize className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-500 transition-colors" />
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-bold text-white">{Math.round(metrics.area)}</span>
                                    <span className="text-xs text-slate-500">m²</span>
                                </div>
                            </div>

                            {/* Perimeter */}
                            <div className="bg-[#0f172a]/80 p-4 hover:bg-slate-800/80 transition-colors group">
                                <div className="flex justify-between items-start mb-1">
                                    <p className="text-[10px] text-blue-500 font-bold uppercase">Chu vi</p>
                                    <ScanLine className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-500 transition-colors" />
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-bold text-white">{Math.round(metrics.perimeter)}</span>
                                    <span className="text-xs text-slate-500">m</span>
                                </div>
                            </div>
                        </div>

                        {/* 4. Power Estimation (Hero Metric) */}
                        <div className="p-5 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
                            <div className="flex justify-between items-end mb-1">
                                <p className="text-xs text-amber-500 font-bold uppercase">Công suất lắp đặt tối đa</p>
                                <div className="animate-pulse w-2 h-2 bg-amber-500 rounded-full"></div>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-bold text-white tracking-tight">{metrics.power.toFixed(1)}</span>
                                <div className="mb-1.5">
                                    <span className="text-sm font-bold text-amber-500">kWp</span>
                                    <span className="text-[10px] text-slate-500 block -mt-0.5">Hệ thống Hybrid</span>
                                </div>
                            </div>
                            <div className="w-full h-1.5 bg-slate-700 rounded-full mt-3 overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 w-3/4"></div>
                            </div>
                        </div>

                        {/* 5. Actions Footer */}
                        <div className="p-4 bg-slate-900 border-t border-slate-700 flex gap-2">
                            {isDrawing ? (
                                <>
                                    <button
                                        onClick={handleUndo}
                                        disabled={points.length === 0}
                                        className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors disabled:opacity-50 border border-slate-700"
                                        title="Hoàn tác điểm cuối"
                                    >
                                        <Undo2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={handleConfirm}
                                        className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-wide shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-2 group"
                                    >
                                        <span>Xác nhận</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleEditAgain}
                                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-500"
                                >
                                    <Move className="w-4 h-4" /> Chỉnh sửa lại
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Helper Instruction */}
            {points.length === 0 && (
                <div className="absolute bottom-10 right-10 z-[400] pointer-events-none animate-bounce">
                    <div className="bg-slate-900/90 backdrop-blur px-6 py-3 rounded-xl border border-blue-500/50 shadow-2xl flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-full">
                            <MousePointerClick className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-sm text-slate-200 font-medium">Click trên bản đồ để vẽ mái nhà</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapSelector;