import React from 'react';
import type { SolarData } from '../types';
import { Check, Award, Battery, Zap, DollarSign } from 'lucide-react';
import { PRICING, type PackageId } from '../constants/pricing.constants';

interface PricingCardsProps {
    area: number;
    monthlyBill: number;
    solarData: SolarData;
    usageHours: number;
}

const PricingCards: React.FC<PricingCardsProps> = ({ area, monthlyBill, solarData, usageHours }) => {
    const ELECTRICITY_PRICE_AVG = PRICING.ELECTRICITY_PRICE_AVG;
    const EFFICIENCY = PRICING.EFFICIENCY;
    const MAX_KWP_FOR_ROOF = area / PRICING.SQM_PER_KWP;

    // Calculate needed system size based on monthly bill
    const monthlyKwhNeeded = monthlyBill / ELECTRICITY_PRICE_AVG;
    const annualKwhNeeded = monthlyKwhNeeded * 12;
    const dailyKwhNeeded = annualKwhNeeded / 365;
    const neededSystemSize = dailyKwhNeeded / (solarData.averageSunHours * EFFICIENCY);

    // Debug logging
    console.log('🔍 === CALCULATION DEBUG ===');
    console.log('💰 Monthly Bill:', monthlyBill.toLocaleString('vi-VN'), 'VNĐ');
    console.log('⚡ Monthly kWh needed:', monthlyKwhNeeded.toFixed(2), 'kWh');
    console.log('📅 Annual kWh needed:', annualKwhNeeded.toFixed(2), 'kWh');
    console.log('☀️ Daily kWh needed:', dailyKwhNeeded.toFixed(2), 'kWh');
    console.log('🏠 Average Sun Hours:', solarData.averageSunHours, 'h/day');
    console.log('📊 Needed System Size:', neededSystemSize.toFixed(2), 'kWp');
    console.log('=========================');


    // Create package calculation function
    const calculatePackage = (packageId: PackageId) => {
        const pkg = PRICING.PACKAGES[packageId];

        const dailyGeneration = pkg.kwp * solarData.averageSunHours * EFFICIENCY;
        const usageFactor = pkg.type === 'ongrid' ? (usageHours / 100) : 1.0;
        const dailySavings = dailyGeneration * usageFactor * ELECTRICITY_PRICE_AVG;
        const monthlySavings = dailySavings * 30;
        const yearlySavings = monthlySavings * 12;
        const roi = pkg.priceFinal / yearlySavings;
        const fitsRoof = pkg.kwp <= MAX_KWP_FOR_ROOF;

        return {
            ...pkg,
            dailySavings: Math.round(dailySavings),
            monthlySavings: Math.round(monthlySavings),
            roi: Math.round(roi * 10) / 10,
            fitsRoof,
            dailyGeneration: Math.round(dailyGeneration * 10) / 10
        };
    };

    // Calculate all packages
    const packages = Object.keys(PRICING.PACKAGES).map(id => calculatePackage(id as PackageId));

    // Find best fit package - IMPROVED LOGIC
    const getBestFit = () => {
        const preferHybrid = usageHours < 70;

        console.log('🎯 === PACKAGE MATCHING ===');
        console.log('Prefer Hybrid?', preferHybrid, '(usageHours:', usageHours + '%)');

        // Dynamic threshold: scale with system size
        const absoluteThreshold = 2.5; // kWp
        const percentageThreshold = 0.3; // 30%
        const threshold = Math.max(absoluteThreshold, neededSystemSize * percentageThreshold);

        console.log('📏 Threshold:', threshold.toFixed(2), 'kWp');

        // Try perfect match
        const perfectMatch = packages.find(pkg => {
            const diff = Math.abs(pkg.kwp - neededSystemSize);
            const sizeMatch = diff < threshold;
            const typeMatch = preferHybrid ? pkg.type === 'hybrid' : true;
            const result = pkg.fitsRoof && sizeMatch && typeMatch;

            console.log(`  ${pkg.id}: diff=${diff.toFixed(2)}, match=${result ? '✅' : '❌'}`);
            return result;
        });

        if (perfectMatch) {
            console.log('✅ Perfect match:', perfectMatch.id);
            return perfectMatch;
        }

        // Fallback: ignore type preference
        const sizeOnly = packages.find(pkg => pkg.fitsRoof && Math.abs(pkg.kwp - neededSystemSize) < threshold);
        if (sizeOnly) {
            console.log('⚠️ Size-only match:', sizeOnly.id);
            return sizeOnly;
        }

        // Final fallback based on need size
        const fitting = packages.filter(p => p.fitsRoof).sort((a, b) => a.kwp - b.kwp);

        // If NO packages fit the roof, return smallest available
        if (fitting.length === 0) {
            const smallest = packages.sort((a, b) => a.kwp - b.kwp)[0];
            console.log('⚠️ NO packages fit roof! Returning smallest:', smallest?.id);
            console.log('=======================');
            return smallest;
        }

        const max = fitting[fitting.length - 1];
        const min = fitting[0];

        let final;
        if (neededSystemSize > max.kwp) {
            final = max; // Need more → largest
            console.log('❗ Need > max → Largest:', final.id);
        } else if (neededSystemSize < min.kwp) {
            final = min; // Need less → smallest  
            console.log('❗ Need < min → Smallest:', final.id);
        } else {
            // Closest
            final = fitting.reduce((closest, pkg) =>
                Math.abs(pkg.kwp - neededSystemSize) < Math.abs(closest.kwp - neededSystemSize) ? pkg : closest
            );
            console.log('❗ Closest:', final.id);
        }

        console.log('=======================');
        return final;
    };

    // Get alternative packages
    const getAlternatives = (recommended: typeof packages[0] | undefined) => {
        if (!recommended) return [];

        const filtered = packages
            .filter(p => p.id !== recommended.id && p.fitsRoof)
            .sort((a, b) => Math.abs(a.kwp - recommended.kwp) - Math.abs(b.kwp - recommended.kwp));

        const smaller = filtered.find(p => p.kwp < recommended.kwp);
        const larger = filtered.find(p => p.kwp > recommended.kwp);

        return [smaller, larger].filter((p): p is NonNullable<typeof p> => p !== undefined).slice(0, 2);
    };

    const recommendedPkg = getBestFit();
    const alternatives = recommendedPkg ? getAlternatives(recommendedPkg) : [];
    const formatMoney = (amount: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

    // Debug logging
    console.log('⭐ Recommended Package:', recommendedPkg?.id, '-', recommendedPkg?.kwp, 'kWp');
    console.log('📦 Alternatives:', alternatives.map(p => p?.id).join(', '));

    if (!recommendedPkg) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-400">Không tìm thấy gói phù hợp với diện tích mái nhà của bạn.</p>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            {/* Recommended Package - Large Card */}
            <div className="mb-12">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-100 mb-2">Gói Được Đề Xuất Cho Bạn</h2>
                    <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full mb-4"></div>
                    <p className="text-gray-400">
                        Dựa trên diện tích mái <span className="font-bold text-amber-500">{Math.round(area)} m²</span> và nhu cầu điện năng của bạn
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-amber-500 transform hover:-translate-y-1 transition-all">
                        {/* Badge */}
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-white text-sm font-bold px-6 py-2 rounded-bl-2xl flex items-center gap-2 shadow-lg z-10">
                            <Award className="w-5 h-5" /> KHUYÊN DÙNG
                        </div>

                        <div className="p-8 bg-gradient-to-br from-amber-50 to-white">
                            {/* Package Type Badge */}
                            <div className="mb-6 flex items-center gap-3">
                                <span className={`text-sm font-bold px-4 py-2 rounded-lg border-2 ${recommendedPkg.type === 'hybrid' ? 'border-blue-500 text-blue-700 bg-blue-50' : 'border-gray-400 text-gray-700 bg-gray-50'}`}>
                                    {recommendedPkg.type === 'hybrid' ? (
                                        <span className="flex items-center gap-2">
                                            <Battery className="w-4 h-4" /> HYBRID - CÓ LƯU TRỮ
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Zap className="w-4 h-4" /> ONGRID - HÒA LƯỚI
                                        </span>
                                    )}
                                </span>
                                {recommendedPkg.batteryCapacity > 0 && (
                                    <span className="text-sm font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-lg">
                                        Pin {recommendedPkg.batteryCapacity}kWh
                                    </span>
                                )}
                            </div>

                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{recommendedPkg.name}</h3>
                            <div className="flex items-end gap-2 mb-6">
                                <span className="text-6xl font-extrabold text-gray-900">{recommendedPkg.kwp}</span>
                                <span className="text-2xl font-bold text-gray-400 mb-2">kWp</span>
                            </div>

                            {/* Key Metrics */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-white p-4 rounded-xl border border-gray-200">
                                    <div className="text-sm text-gray-500 mb-1">Chi phí đầu tư</div>
                                    <div className="text-2xl font-bold text-gray-900">{formatMoney(recommendedPkg.priceFinal)}</div>
                                </div>
                                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                                    <div className="text-sm text-emerald-700 mb-1">Tiết kiệm/tháng</div>
                                    <div className="text-2xl font-bold text-emerald-700">{formatMoney(recommendedPkg.monthlySavings)}</div>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                    <div className="text-sm text-blue-700 mb-1">Tiết kiệm/ngày</div>
                                    <div className="text-2xl font-bold text-blue-700">{formatMoney(recommendedPkg.dailySavings)}</div>
                                </div>
                                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                                    <div className="text-sm text-amber-700 mb-1">Hoàn vốn (ROI)</div>
                                    <div className="text-2xl font-bold text-amber-700">{recommendedPkg.roi} năm</div>
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {recommendedPkg.features.map((feat, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700">
                                        <div className="mt-1 p-1 bg-emerald-100 rounded-full shrink-0">
                                            <Check className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <span className="font-medium">{feat.text}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                <DollarSign className="w-6 h-6" />
                                Chọn Gói Này Ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alternative Packages */}
            {alternatives.length > 0 && (
                <div>
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-100 mb-2">Các Lựa Chọn Khác</h3>
                        <p className="text-gray-400 text-sm">Tùy chọn thay thế phù hợp với nhu cầu của bạn</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {alternatives.map((pkg) => (
                            <div key={pkg.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all">
                                <div className="p-6">
                                    <div className="mb-4">
                                        <span className={`text-xs font-bold px-3 py-1 rounded border ${pkg.type === 'hybrid' ? 'border-blue-200 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-500'}`}>
                                            {pkg.type === 'hybrid' ? 'HYBRID' : 'ONGRID'}
                                            {pkg.batteryCapacity > 0 && ` - Pin ${pkg.batteryCapacity}kWh`}
                                        </span>
                                    </div>

                                    <h4 className="text-lg font-bold text-gray-800 mb-2">{pkg.name}</h4>
                                    <div className="flex items-end gap-1 mb-4">
                                        <span className="text-4xl font-extrabold text-gray-900">{pkg.kwp}</span>
                                        <span className="text-lg font-bold text-gray-400 mb-1">kWp</span>
                                    </div>

                                    <div className="space-y-2 mb-4 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Chi phí:</span>
                                            <span className="font-bold text-gray-900">{formatMoney(pkg.priceFinal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Tiết kiệm/tháng:</span>
                                            <span className="font-bold text-emerald-600">{formatMoney(pkg.monthlySavings)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">ROI:</span>
                                            <span className="font-bold text-amber-600">{pkg.roi} năm</span>
                                        </div>
                                    </div>

                                    <button className="w-full py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all">
                                        Xem Chi Tiết
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PricingCards;
