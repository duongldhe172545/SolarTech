import React from 'react';
import type { Quotation } from '../types';
import { Check, Award, AlertTriangle, LayoutGrid } from 'lucide-react';

interface PricingCardsProps {
    area: number;
    monthlyBill: number;
    solarData: { ghi: number };
}

const PricingCards: React.FC<PricingCardsProps> = ({ area, monthlyBill, solarData }) => {

    // Constants
    const ELECTRICITY_PRICE_AVG = 2800; // VND/kWh
    const PRICE_PER_KWP = 15000000;
    const PERFORMANCE_RATIO = 0.75;
    const MAX_KWP_FOR_ROOF = area / 6;
    const yieldPerKwp = solarData.ghi * PERFORMANCE_RATIO;

    const monthlyKwhNeeded = monthlyBill / ELECTRICITY_PRICE_AVG;
    const annualKwhNeeded = monthlyKwhNeeded * 12;
    const neededSystemSize = annualKwhNeeded / yieldPerKwp;

    const createPackage = (name: string, kwp: number, type: Quotation['packageType'], features: { text: string, tooltip: string }[]) => {
        const annualGeneration = kwp * yieldPerKwp;
        const monthlySavings = (annualGeneration / 12) * ELECTRICITY_PRICE_AVG;
        const systemCost = kwp * PRICE_PER_KWP;
        const roi = systemCost / (monthlySavings * 12);

        return {
            name,
            kwp: Math.round(kwp * 10) / 10,
            price: systemCost,
            monthlySavings: Math.round(monthlySavings),
            roi: Math.round(roi * 10) / 10,
            type,
            features,
            fitsRoof: kwp <= MAX_KWP_FOR_ROOF
        };
    };

    const packages = [
        createPackage('Gói Tiết Kiệm', 3, 'SAVER', [
            { text: 'Inverter hòa lưới cơ bản', tooltip: 'Thiết bị chuyển đổi điện DC sang AC, tự động hòa lưới điện quốc gia.' },
            { text: 'Tấm pin Tier 1 (450W)', tooltip: 'Top 10 nhà sản xuất pin lớn nhất thế giới, hiệu suất >20%.' },
            { text: 'Bảo hành 5 năm', tooltip: 'Bảo hành vật lý cho toàn bộ hệ thống.' },
            { text: 'Phù hợp gia đình nhỏ', tooltip: 'Dành cho hóa đơn điện < 1.5 triệu/tháng.' }
        ]),
        createPackage('Gói Phổ Thông', 5, 'STANDARD', [
            { text: 'Inverter thông minh (Wifi)', tooltip: 'Theo dõi sản lượng điện qua ứng dụng điện thoại mọi lúc mọi nơi.' },
            { text: 'Tấm pin Mono Perc (550W)', tooltip: 'Công nghệ tế bào quang điện mới nhất, hoạt động tốt khi trời râm.' },
            { text: 'Bảo hành 10 năm', tooltip: 'Cam kết chất lượng dài hạn cho thiết bị chính.' },
            { text: 'Tối ưu cho gia đình 4-5 người', tooltip: 'Dành cho hóa đơn điện 2 - 4 triệu/tháng.' }
        ]),
        createPackage('Gói Cao Cấp', 10, 'PREMIUM', [
            { text: 'Inverter Hybrid cao cấp', tooltip: 'Có khả năng kết hợp pin lưu trữ, hoạt động khi mất điện lưới.' },
            { text: 'Tấm pin Bifacial 2 mặt', tooltip: 'Hấp thụ ánh sáng từ cả mặt sau, tăng 15% sản lượng.' },
            { text: 'Bảo hành 12-25 năm', tooltip: 'Bảo hành hiệu suất tấm pin lên đến 25 năm.' },
            { text: 'Dành cho biệt thự/kinh doanh', tooltip: 'Dành cho hóa đơn điện > 5 triệu/tháng.' }
        ]),
    ];

    const maxSavings = Math.max(...packages.map(p => p.monthlySavings));
    const formatMoney = (amount: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

    // Helper component for visualization
    const PanelVisualizer = ({ kwp }: { kwp: number }) => {
        // Approx 500W per panel for visualization
        const panelCount = Math.ceil(kwp * 2);

        return (
            <div className="w-full bg-slate-50 rounded-xl border border-slate-100 p-3 mb-4">
                <div className="flex items-center gap-1.5 mb-2 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    <LayoutGrid className="w-3 h-3" />
                    Mô phỏng lắp đặt ({panelCount} tấm)
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                    {Array.from({ length: panelCount }).map((_, i) => (
                        <div key={i} className="w-6 h-8 bg-blue-900 border-b-2 border-blue-600 rounded-[1px] relative shadow-sm overflow-hidden group/panel transition-transform hover:scale-110 duration-300" title="Tấm pin năng lượng mặt trời">
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
                            {/* Grid lines */}
                            <div className="w-full h-full grid grid-cols-2 grid-rows-3 opacity-30">
                                <div className="border-r border-b border-white/50"></div>
                                <div className="border-b border-white/50"></div>
                                <div className="border-r border-b border-white/50"></div>
                                <div className="border-b border-white/50"></div>
                                <div className="border-r border-white/50"></div>
                                <div className=""></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-2 text-[10px] text-slate-400">
                    Diện tích cần: ~{Math.round(kwp * 6)} m²
                </div>
            </div>
        );
    };

    return (
        <div className="w-full py-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-100 mb-2">Đề Xuất Hệ Thống</h2>
                <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full mb-4"></div>
                <p className="text-gray-400">
                    Dựa trên diện tích mái <span className="font-bold text-amber-500">{Math.round(area)} m²</span> và tiềm năng bức xạ tại khu vực của bạn.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                {packages.map((pkg, idx) => {
                    const isBillMatch = Math.abs(pkg.kwp - neededSystemSize) < 2.5;
                    const isBestFit = isBillMatch && pkg.fitsRoof;
                    const savingsPercentage = Math.min((pkg.monthlySavings / maxSavings) * 100, 100);

                    return (
                        <div
                            key={idx}
                            className={`relative bg-white rounded-2xl shadow-xl overflow-hidden border transition-all duration-300 flex flex-col
                    ${isBestFit ? 'border-amber-500 ring-4 ring-amber-500/20 scale-105 z-10 shadow-2xl' : 'border-gray-200'}
                    ${!pkg.fitsRoof ? 'opacity-75 grayscale-[0.5]' : 'hover:-translate-y-2 hover:shadow-2xl'}
                `}
                        >
                            {isBestFit && (
                                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 shadow-md">
                                    <Award className="w-3 h-3" /> KHUYÊN DÙNG
                                </div>
                            )}

                            {!pkg.fitsRoof && (
                                <div className="absolute top-0 left-0 bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-br-lg flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" /> Diện tích mái không đủ
                                </div>
                            )}

                            <div className={`p-6 ${pkg.type === 'PREMIUM' ? 'bg-gradient-to-b from-amber-50 to-white' : ''} flex flex-col h-full`}>
                                <div className="mb-4">
                                    <span className={`text-xs font-bold px-2 py-1 rounded border ${pkg.type === 'PREMIUM' ? 'border-amber-200 text-amber-600 bg-amber-50' : 'border-gray-200 text-gray-500'}`}>
                                        {pkg.type === 'SAVER' ? 'CƠ BẢN' : pkg.type === 'STANDARD' ? 'PHỔ THÔNG' : 'CAO CẤP'}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-1">{pkg.name}</h3>
                                <div className="flex items-end gap-1 mb-4">
                                    <span className="text-5xl font-extrabold text-gray-900 tracking-tighter">{pkg.kwp}</span>
                                    <span className="text-lg font-bold text-gray-400 mb-1">kWp</span>
                                </div>

                                {/* Visualizer */}
                                <PanelVisualizer kwp={pkg.kwp} />

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-3 border-dashed">
                                        <span className="text-gray-500 text-sm font-medium">Chi phí đầu tư</span>
                                        <span className="font-bold text-gray-900 text-lg">{formatMoney(pkg.price)}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-3 border-dashed">
                                        <span className="text-gray-500 text-sm font-medium">Tiết kiệm/tháng</span>
                                        <span className="font-bold text-emerald-600">~{formatMoney(pkg.monthlySavings)}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2">
                                        <span className="text-gray-500 text-sm font-medium">Hoàn vốn (ROI)</span>
                                        <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">{pkg.roi} năm</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8 flex-grow">
                                    {pkg.features.map((feat, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600 group relative cursor-help">
                                            <div className="mt-0.5 p-0.5 bg-emerald-100 rounded-full shrink-0">
                                                <Check className="w-3 h-3 text-emerald-600" />
                                            </div>
                                            <span className="border-b border-dashed border-gray-300 hover:border-emerald-500 transition-colors">
                                                {feat.text}
                                            </span>
                                            {/* Tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none text-center">
                                                {feat.tooltip}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Savings Bar Chart */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between gap-1 mb-2">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Hiệu quả kinh tế</span>
                                        <span className="text-xs font-bold text-amber-600">{Math.round(savingsPercentage)}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ease-out ${!pkg.fitsRoof ? 'bg-gray-400' : 'bg-gradient-to-r from-emerald-400 to-emerald-500'}`}
                                            style={{ width: `${savingsPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <button
                                    disabled={!pkg.fitsRoof}
                                    className={`w-full py-3.5 rounded-xl font-bold transition-all mt-auto shadow-lg
                    ${!pkg.fitsRoof
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                                            : isBestFit
                                                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:shadow-orange-500/30 hover:scale-[1.02]'
                                                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}
                `}>
                                    {!pkg.fitsRoof ? 'Diện tích mái không đủ' : 'Chọn gói này'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PricingCards;
