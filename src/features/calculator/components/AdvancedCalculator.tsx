import React, { useState, Suspense, useEffect, useRef } from 'react';
// Lazy load MapSelector for performance and crash prevention
const MapSelector = React.lazy(() => import('./MapSelector'));
import PricingCards from './PricingCards';
import ResultsDashboard from './ResultsDashboard';
import type { AddressResult, CalculatorState, Coordinates, SolarData } from '../types';
import { solarApi } from '../services/api';
import { geocodingApi } from '../services/api';
import {
    MapPin, Search, User, Phone,
    Zap, BarChart3, ChevronDown, Loader2, MousePointerClick
} from 'lucide-react';

const AdvancedCalculator: React.FC = () => {
    // State
    const [address, setAddress] = useState<AddressResult | null>(null);
    const [roofArea, setRoofArea] = useState<number>(0);
    const [solarData, setSolarData] = useState<SolarData>({ ghi: 1500, averageSunHours: 4.1 });
    const [showResults, setShowResults] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    // Form State
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<AddressResult[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const [formState, setFormState] = useState<CalculatorState>({
        monthlyBill: 3000000,
        usageHours: 50,
        electricityType: 'residential',
        phase: '1',
        battery: '5kw'
    });

    // Contact Information
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

    const resultsRef = useRef<HTMLDivElement>(null);

    // Search Address Logic
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.length >= 3) {
                setIsSearching(true);
                const data = await geocodingApi.searchAddress(searchQuery);
                setSearchResults(data);
                setIsSearching(false);
                setShowDropdown(true);
            } else {
                setSearchResults([]);
                setShowDropdown(false);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleAddressSelect = (selected: AddressResult) => {
        setAddress(selected);
        setSearchQuery(selected.display_name);
        setShowDropdown(false);
    };

    const handleAreaConfirmed = async (area: number) => {
        setRoofArea(area);
    };

    const handleCalculate = async () => {
        // Validate contact information
        if (!customerName.trim()) {
            alert("Vui lòng nhập họ tên để nhận báo giá.");
            return;
        }
        if (!customerPhone.trim()) {
            alert("Vui lòng nhập số điện thoại để nhận báo giá.");
            return;
        }
        // Basic phone validation (Vietnamese phone numbers)
        const phoneRegex = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
        if (!phoneRegex.test(customerPhone.replace(/\s/g, ''))) {
            alert("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.");
            return;
        }

        if (!address) {
            alert("Vui lòng nhập địa chỉ để định vị ngôi nhà.");
            return;
        }
        if (roofArea === 0) {
            alert("Vui lòng vẽ và XÁC NHẬN diện tích mái nhà trên bản đồ.");
            return;
        }

        // Validate parsing
        const lat = parseFloat(address.lat);
        const lon = parseFloat(address.lon);

        if (isNaN(lat) || isNaN(lon)) {
            alert("Lỗi dữ liệu địa lý. Vui lòng chọn địa chỉ khác.");
            return;
        }

        // Simulate Fetch Data with new Solar Service
        const data = await solarApi.fetchSolarData(lat, lon);
        setSolarData(data);
        setShowResults(true);

        // Scroll to results
        setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    // Format number with thousands separator
    const formatCurrency = (value: number): string => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // Parse formatted currency back to number
    const parseCurrency = (value: string): number => {
        return Number(value.replace(/,/g, ''));
    };

    // Safe initial center calc
    const getInitialCenter = (): Coordinates => {
        if (address) {
            const lat = parseFloat(address.lat);
            const lng = parseFloat(address.lon);
            if (!isNaN(lat) && !isNaN(lng)) {
                return { lat, lng };
            }
        }
        return { lat: 21.028511, lng: 105.804817 }; // TODO: use MAP.DEFAULT_CENTER
    }

    return (
        <div className="relative">
            {/* --- MAIN HERO SECTION (Calculator + Map) --- */}
            <section id="calculator" className="relative h-[800px] lg:h-[900px] w-full overflow-hidden">

                {/* BACKGROUND MAP (Fixed Layer) */}
                <div className="absolute inset-0 z-0 bg-slate-800">
                    <Suspense fallback={
                        <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white gap-3">
                            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                            <span>Đang tải dữ liệu vệ tinh...</span>
                        </div>
                    }>
                        <MapSelector
                            initialCenter={getInitialCenter()}
                            address={address}
                            onAreaCalculated={handleAreaConfirmed}
                            onRetake={() => setRoofArea(0)}
                        />
                    </Suspense>

                    {/* Map Overlay Gradient (for text readability if needed) */}
                    {!address && <div className="absolute inset-0 bg-black/40 pointer-events-none z-[1] flex items-center justify-center">
                        <div className="text-center p-6 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10">
                            <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
                            <p className="text-white/50 text-sm font-medium uppercase tracking-widest">Vui lòng nhập địa chỉ để bắt đầu</p>
                        </div>
                    </div>}
                </div>

                {/* FLOATING CONTENT LAYER */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="container mx-auto px-4 h-full flex flex-col lg:flex-row items-center lg:items-start pt-8 lg:pt-16">

                        {/* --- FLOATING FORM (Left) --- */}
                        <div className="w-full max-w-md pointer-events-auto">
                            {/* Title Block Removed */}
                            <div className="mb-6 drop-shadow-lg">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur border border-amber-500/40 text-amber-500 text-xs font-bold uppercase tracking-wider mb-3 shadow-lg">
                                    <Zap className="w-3 h-3" /> AI Solar Technology
                                </div>
                            </div>

                            {/* The Form Card (Glassmorphism) */}
                            <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-5 relative overflow-hidden group animate-in slide-in-from-left-8 duration-700">

                                {/* 1. Contact Information */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wide">
                                            Họ tên <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative group/input">
                                            <input
                                                type="text"
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                                placeholder="Nguyễn Văn A"
                                                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none text-white placeholder-gray-500 shadow-inner text-sm"
                                            />
                                            <User className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within/input:text-amber-500 transition-colors" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wide">
                                            Số điện thoại <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative group/input">
                                            <input
                                                type="tel"
                                                value={customerPhone}
                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                                placeholder="0912345678"
                                                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none text-white placeholder-gray-500 shadow-inner text-sm"
                                            />
                                            <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within/input:text-amber-500 transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Address Search */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wide">
                                        Địa chỉ nhà <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative group/input">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="VD: 37 Lê Văn Thiêm, Thanh Xuân, HN"
                                            className="w-full pl-10 pr-4 py-3.5 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none text-white placeholder-gray-500 shadow-inner text-sm"
                                        />
                                        <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400 group-focus-within/input:text-amber-500 transition-colors" />
                                        {isSearching && <Loader2 className="absolute right-3.5 top-3.5 w-5 h-5 text-amber-500 animate-spin" />}

                                        {/* Dropdown Results */}
                                        {showDropdown && searchResults.length > 0 && (
                                            <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-white/10 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                                                {searchResults.map((item, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={() => handleAddressSelect(item)}
                                                        className="px-4 py-3 hover:bg-white/5 cursor-pointer flex items-start gap-3 border-b border-white/5 last:border-0"
                                                    >
                                                        <MapPin className="w-4 h-4 mt-1 text-amber-500 shrink-0" />
                                                        <span className="text-sm text-gray-300 line-clamp-2">{item.display_name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 3. Monthly Bill */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wide">
                                        Tiền điện trung bình/tháng <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative mb-3">
                                        <input
                                            type="text"
                                            value={formatCurrency(formState.monthlyBill)}
                                            onChange={(e) => {
                                                const parsed = parseCurrency(e.target.value);
                                                if (!isNaN(parsed)) {
                                                    setFormState({ ...formState, monthlyBill: parsed });
                                                }
                                            }}
                                            className="w-full pl-4 pr-12 py-3 bg-slate-800/60 text-white font-semibold text-base rounded-xl border border-slate-400/20 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all outline-none shadow-inner"
                                            placeholder="3,000,000"
                                        />
                                        <span className="absolute right-4 top-3.5 text-gray-500 font-bold text-sm">VNĐ</span>
                                    </div>

                                    {/* Usage Slider */}
                                    <div className="px-1">
                                        <div className="flex justify-between mb-1.5">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Mức dùng ban ngày (6H-18H)</label>
                                            <span className="text-xs font-bold text-amber-500">{formState.usageHours}%</span>
                                        </div>
                                        <div className="relative h-6 flex items-center">
                                            <div className="absolute w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-500" style={{ width: `${formState.usageHours}%` }}></div>
                                            </div>
                                            <input
                                                type="range"
                                                min="0" max="100"
                                                value={formState.usageHours}
                                                onChange={(e) => setFormState({ ...formState, usageHours: Number(e.target.value) })}
                                                className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div
                                                className="absolute h-4 w-4 bg-white border-2 border-amber-500 rounded-full shadow-lg pointer-events-none transition-all"
                                                style={{ left: `calc(${formState.usageHours}% - 8px)` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                {/* 4. Dropdowns Row */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Giá điện</label>
                                        <div className="relative">
                                            <select
                                                className="w-full px-3 py-2.5 bg-black/40 text-white border border-white/10 rounded-lg text-sm appearance-none outline-none focus:ring-1 focus:ring-amber-500"
                                                value={formState.electricityType}
                                                onChange={(e) => setFormState({ ...formState, electricityType: e.target.value })}
                                            >
                                                <option value="residential">Sinh hoạt</option>
                                                <option value="business">Kinh doanh</option>
                                            </select>
                                            <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Hệ thống</label>
                                        <div className="relative">
                                            <select
                                                className="w-full px-3 py-2.5 bg-black/40 text-white border border-white/10 rounded-lg text-sm appearance-none outline-none focus:ring-1 focus:ring-amber-500"
                                                value={formState.phase}
                                                onChange={(e) => setFormState({ ...formState, phase: e.target.value })}
                                            >
                                                <option value="1">1 Pha</option>
                                                <option value="3">3 Pha</option>
                                            </select>
                                            <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* 5. Battery */}
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 mb-1 flex items-center gap-1 uppercase">
                                        Bộ lưu trữ (Hybrid)
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full px-3 py-2.5 bg-black/40 text-white border border-white/10 rounded-lg text-sm appearance-none outline-none focus:ring-1 focus:ring-amber-500"
                                            value={formState.battery}
                                            onChange={(e) => setFormState({ ...formState, battery: e.target.value })}
                                        >
                                            <option value="none">Chưa cần lưu trữ</option>
                                            <option value="5kw">Pin lưu trữ 5kWh</option>
                                            <option value="10kw">Pin lưu trữ 10kWh</option>
                                        </select>
                                        <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <button
                                        onClick={handleCalculate}
                                        className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 text-base"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <BarChart3 className="w-5 h-5" />
                                        Xem báo giá & Lợi nhuận
                                    </button>
                                    {!address && <p className="text-center text-[10px] text-amber-500 mt-2 italic">Hãy tìm địa chỉ trước để mở khóa bản đồ</p>}
                                </div>
                            </div>
                        </div>

                        {/* --- FLOATING INSTRUCTION (Right - Visible only when map active but NOT confirmed) --- */}
                        {address && !roofArea && (
                            <div className="hidden lg:block absolute right-10 top-32 pointer-events-auto max-w-xs animate-in slide-in-from-right-8 duration-500">
                                <div className="bg-white/90 backdrop-blur text-slate-900 p-4 rounded-xl shadow-2xl border border-white/50 relative">
                                    <div className="absolute -left-2 top-6 w-4 h-4 bg-white rotate-45"></div>
                                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                        <MousePointerClick className="w-5 h-5 text-amber-500" />
                                        Hướng dẫn vẽ mái
                                    </h3>
                                    <ol className="text-sm text-gray-600 leading-relaxed list-decimal pl-4 space-y-1">
                                        <li>Click 4 góc của mái nhà trên bản đồ.</li>
                                        <li><strong>Kéo thả</strong> các điểm trắng để chỉnh cho khít.</li>
                                        <li>Xem diện tích dự kiến hiện ra.</li>
                                        <li>Bấm <strong>"Xác nhận"</strong> ở bảng điều khiển bên dưới.</li>
                                    </ol>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- RESULTS SECTION (Appears Conditionally) --- */}
            {showResults && (
                <section ref={resultsRef} className="py-20 bg-slate-900 border-t border-white/5 relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                    <div className="container mx-auto px-4">

                        {/* Solar Potential Dashboard */}
                        <ResultsDashboard solarData={solarData} roofArea={roofArea} />

                        <PricingCards
                            area={roofArea}
                            monthlyBill={formState.monthlyBill}
                            solarData={solarData}
                        />
                    </div>
                </section>
            )}
        </div>
    );
};

export default AdvancedCalculator;
