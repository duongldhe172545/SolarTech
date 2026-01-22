import React from 'react';
import { Sun, CloudSun, Maximize, CheckCircle2, Star, DollarSign } from 'lucide-react';
import type { SolarData } from '../types';
import { PRICING } from '../constants/pricing.constants';

interface ResultsDashboardProps {
    solarData: SolarData;
    roofArea: number;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ solarData, roofArea }) => {
    // Calculate potential financial results based on max installable capacity
    const maxKWp = roofArea / PRICING.SQM_PER_KWP;
    const dailyGeneration = maxKWp * solarData.averageSunHours * PRICING.EFFICIENCY;
    const potentialDailySavings = dailyGeneration * PRICING.ELECTRICITY_PRICE_AVG;
    const potentialMonthlySavings = potentialDailySavings * 30;

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="mb-12 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 border border-white/5 shadow-xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Sun className="w-64 h-64 text-amber-500" />
            </div>

            <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Sun className="w-6 h-6 text-amber-500 fill-amber-500" />
                    Phân Tích Tiềm Năng Năng Lượng
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {/* GHI Card */}
                    <div className="bg-slate-900/50 backdrop-blur border border-white/10 rounded-xl p-4 flex flex-col hover:border-amber-500/50 transition-colors">
                        <div className="flex items-center gap-2 mb-3 text-slate-400">
                            <Sun className="w-4 h-4 text-amber-500" />
                            <span className="text-xs font-bold uppercase tracking-wider">Bức xạ mặt trời (GHI)</span>
                        </div>
                        <div className="flex items-end gap-2 mt-auto">
                            <span className="text-3xl font-bold text-amber-400">{solarData.ghi}</span>
                            <span className="text-sm text-slate-500 font-medium mb-1">kWh/m²/năm</span>
                        </div>
                        <div className="w-full h-1 bg-slate-700 mt-3 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" style={{ width: `${Math.min((solarData.ghi / 2000) * 100, 100)}%` }}></div>
                        </div>
                    </div>

                    {/* Sun Hours Card */}
                    <div className="bg-slate-900/50 backdrop-blur border border-white/10 rounded-xl p-4 flex flex-col hover:border-orange-500/50 transition-colors">
                        <div className="flex items-center gap-2 mb-3 text-slate-400">
                            <CloudSun className="w-4 h-4 text-orange-500" />
                            <span className="text-xs font-bold uppercase tracking-wider">Giờ nắng trung bình</span>
                        </div>
                        <div className="flex items-end gap-2 mt-auto">
                            <span className="text-3xl font-bold text-orange-400">
                                {solarData.averageSunHours}
                            </span>
                            <span className="text-sm text-slate-500 font-medium mb-1">giờ/ngày</span>
                        </div>
                        <div className="w-full h-1 bg-slate-700 mt-3 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" style={{ width: `${Math.min((solarData.averageSunHours / 8) * 100, 100)}%` }}></div>
                        </div>
                    </div>

                    {/* Roof Area Card */}
                    <div className="bg-slate-900/50 backdrop-blur border border-white/10 rounded-xl p-4 flex flex-col hover:border-emerald-500/50 transition-colors">
                        <div className="flex items-center gap-2 mb-3 text-slate-400">
                            <Maximize className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-bold uppercase tracking-wider">Diện tích mái hiệu dụng</span>
                        </div>
                        <div className="flex items-end gap-2 mt-auto">
                            <span className="text-3xl font-bold text-emerald-400">{Math.round(roofArea)}</span>
                            <span className="text-sm text-slate-500 font-medium mb-1">m²</span>
                        </div>
                        <div className="w-full h-1 bg-slate-700 mt-3 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: '100%' }}></div>
                        </div>
                    </div>

                    {/* Efficiency Score Card */}
                    <div className="bg-slate-900/50 backdrop-blur border border-white/10 rounded-xl p-4 flex flex-col hover:border-blue-500/50 transition-colors">
                        <div className="flex items-center gap-2 mb-3 text-slate-400">
                            <CheckCircle2 className="w-4 h-4 text-blue-500" />
                            <span className="text-xs font-bold uppercase tracking-wider">Đánh giá tiềm năng</span>
                        </div>
                        <div className="flex items-center gap-2 mt-auto">
                            <span className="text-2xl font-bold text-white">Rất tốt</span>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2">Khu vực có lượng bức xạ cao, phù hợp lắp đặt.</p>
                    </div>

                    {/* Financial Results Card - NEW */}
                    <div className="bg-slate-900/50 backdrop-blur border border-white/10 rounded-xl p-4 flex flex-col hover:border-green-500/50 transition-colors">
                        <div className="flex items-center gap-2 mb-3 text-slate-400">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <span className="text-xs font-bold uppercase tracking-wider">Tiết kiệm tối đa</span>
                        </div>
                        <div className="flex flex-col gap-1 mt-auto">
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-green-400">{formatMoney(potentialDailySavings)}</span>
                            </div>
                            <span className="text-xs text-slate-500 font-medium">mỗi ngày</span>
                        </div>
                        <div className="w-full h-1 bg-slate-700 mt-3 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" style={{ width: '100%' }}></div>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2">≈ {formatMoney(potentialMonthlySavings)}/tháng với {maxKWp.toFixed(1)}kWp</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsDashboard;
