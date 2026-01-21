import React from 'react';
import { DollarSign, TrendingUp, Info } from 'lucide-react';

interface DailySavingsBlockProps {
    systemKwp: number;
    averageSunHours: number;
    usageHours: number;
    systemType: 'ongrid' | 'hybrid';
}

const DailySavingsBlock: React.FC<DailySavingsBlockProps> = ({
    systemKwp,
    averageSunHours,
    usageHours,
    systemType
}) => {
    const EFFICIENCY = 0.8;
    const ELECTRICITY_PRICE = 2800;

    // Calculate daily generation: kwp * sun hours * efficiency
    const dailyGeneration = systemKwp * averageSunHours * EFFICIENCY;

    // Calculate daily savings
    // Ongrid: only saves during daytime usage
    // Hybrid: can save full generation due to battery storage
    const usageFactor = systemType === 'ongrid' ? (usageHours / 100) : 1.0;
    const dailySavings = dailyGeneration * usageFactor * ELECTRICITY_PRICE;

    const formatMoney = (amount: number) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

    return (
        <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/50 transition-all">
            {/* Background decoration */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors" />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                        <DollarSign className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">
                        Tiết Kiệm Ước Tính/Ngày
                    </h3>
                    <div className="group/tooltip relative ml-auto">
                        <Info className="w-4 h-4 text-slate-400 cursor-help" />
                        <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-20 pointer-events-none">
                            <p className="mb-2">
                                <strong>Công thức:</strong><br />
                                Công suất ({systemKwp}kW) × Giờ nắng ({averageSunHours}h) × Hiệu suất (80%)
                                {systemType === 'ongrid' && ` × Dùng ban ngày (${usageHours}%)`}
                            </p>
                            <p className="text-[10px] text-slate-400">
                                {systemType === 'ongrid'
                                    ? 'Hệ thống Ongrid chỉ tiết kiệm khi dùng điện ban ngày'
                                    : 'Hệ thống Hybrid có pin lưu trữ, tiết kiệm tối đa'}
                            </p>
                            <div className="absolute top-full right-4 border-4 border-transparent border-t-slate-800" />
                        </div>
                    </div>
                </div>

                {/* Savings Amount */}
                <div className="mb-4">
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-bold text-white">
                            {Math.round(dailySavings / 1000).toLocaleString('vi-VN')}k
                        </span>
                        <span className="text-sm text-slate-400 mb-2">VNĐ/ngày</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                        ≈ {formatMoney(dailySavings * 30)}/tháng
                    </div>
                </div>

                {/* Generation Stats */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-emerald-500/20">
                    <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Sản lượng/ngày</div>
                        <div className="text-lg font-bold text-emerald-400">{dailyGeneration.toFixed(1)} kWh</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Tiết kiệm thực tế</div>
                        <div className="text-lg font-bold text-white flex items-center gap-1">
                            {Math.round(usageFactor * 100)}%
                            {systemType === 'hybrid' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailySavingsBlock;
