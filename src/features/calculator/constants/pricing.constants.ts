// Pricing constants for solar system packages
export const PRICING = {
    // Electricity pricing
    ELECTRICITY_PRICE_AVG: 2800, // VND/kWh

    // System efficiency
    EFFICIENCY: 0.8, // 80% system efficiency

    // Area requirements
    SQM_PER_KWP: 6, // m² per kWp

    // Package definitions - 6 real packages
    PACKAGES: {
        'ONG-6K': {
            id: 'ONG-6K',
            name: 'Combo hòa lưới bám tải 6kW',
            kwp: 6,
            type: 'ongrid' as const,
            priceOriginal: 37000000,
            priceFinal: 50000000,
            batteryCapacity: 0,
            features: [
                { text: 'Inverter hòa lưới 6kW', tooltip: 'Thiết bị chuyển đổi điện DC sang AC, tự động hòa lưới điện quốc gia.' },
                { text: 'Tấm pin Mono 500W (12 tấm)', tooltip: 'Công nghệ Mono Perc hiệu suất cao, hoạt động tốt trong điều kiện ánh sáng yếu.' },
                { text: 'Bảo hành 5 năm', tooltip: 'Bảo hành vật lý cho toàn bộ hệ thống và thiết bị.' },
                { text: 'Gia đình 3-4 người', tooltip: 'Phù hợp với hóa đơn điện 2-4 triệu/tháng.' }
            ]
        },
        'ONG-8K': {
            id: 'ONG-8K',
            name: 'Combo hòa lưới bám tải 8kW',
            kwp: 8,
            type: 'ongrid' as const,
            priceOriginal: 45000000,
            priceFinal: 60000000,
            batteryCapacity: 0,
            features: [
                { text: 'Inverter hòa lưới 8kW', tooltip: 'Thiết bị chuyển đổi điện DC sang AC, tự động hòa lưới điện quốc gia.' },
                { text: 'Tấm pin Mono 500W (16 tấm)', tooltip: 'Công nghệ Mono Perc hiệu suất cao, hoạt động tốt trong điều kiện ánh sáng yếu.' },
                { text: 'Bảo hành 5 năm', tooltip: 'Bảo hành vật lý cho toàn bộ hệ thống và thiết bị.' },
                { text: 'Gia đình lớn/Văn phòng nhỏ', tooltip: 'Phù hợp với hóa đơn điện 4-6 triệu/tháng.' }
            ]
        },
        'ONG-10K': {
            id: 'ONG-10K',
            name: 'Combo hòa lưới bám tải 10kW',
            kwp: 10,
            type: 'ongrid' as const,
            priceOriginal: 57000000,
            priceFinal: 75000000,
            batteryCapacity: 0,
            features: [
                { text: 'Inverter hòa lưới 10kW', tooltip: 'Thiết bị chuyển đổi điện DC sang AC, tự động hòa lưới điện quốc gia.' },
                { text: 'Tấm pin Mono 500W (20 tấm)', tooltip: 'Công nghệ Mono Perc hiệu suất cao, hoạt động tốt trong điều kiện ánh sáng yếu.' },
                { text: 'Bảo hành 5 năm', tooltip: 'Bảo hành vật lý cho toàn bộ hệ thống và thiết bị.' },
                { text: 'Biệt thự/Kinh doanh', tooltip: 'Phù hợp với hóa đơn điện >6 triệu/tháng.' }
            ]
        },
        'HYB-6K-S': {
            id: 'HYB-6K-S',
            name: 'Combo hybrid 6kW lưu trữ 10kWh phổ thông',
            kwp: 6,
            type: 'hybrid' as const,
            priceOriginal: 75000000,
            priceFinal: 100000000,
            batteryCapacity: 10,
            features: [
                { text: 'Inverter Hybrid 6kW + Pin 10kWh', tooltip: 'Có khả năng lưu trữ điện, sử dụng được cả khi mất điện lưới hoặc ban đêm.' },
                { text: 'Tấm pin Mono 500W (12 tấm)', tooltip: 'Công nghệ Mono Perc hiệu suất cao, hoạt động tốt trong điều kiện ánh sáng yếu.' },
                { text: 'Bảo hành 10 năm', tooltip: 'Cam kết chất lượng dài hạn cho thiết bị chính và pin lưu trữ.' },
                { text: 'Gia đình 3-4 người', tooltip: 'Phù hợp với gia đình dùng nhiều điện ban đêm, hóa đơn 2-4 triệu/tháng.' }
            ]
        },
        'HYB-8K-P': {
            id: 'HYB-8K-P',
            name: 'Combo hybrid 8kW lưu trữ 10kWh cao cấp',
            kwp: 8,
            type: 'hybrid' as const,
            priceOriginal: 83000000,
            priceFinal: 115000000,
            batteryCapacity: 10,
            features: [
                { text: 'Inverter Hybrid cao cấp 8kW + Pin 10kWh', tooltip: 'Hệ thống cao cấp với khả năng lưu trữ điện, hoạt động ổn định khi mất điện lưới.' },
                { text: 'Tấm pin Mono PERC 500W (16 tấm)', tooltip: 'Công nghệ tế bào quang điện mới nhất, hiệu suất cao >21%.' },
                { text: 'Bảo hành 12-25 năm', tooltip: 'Bảo hành hiệu suất tấm pin lên đến 25 năm, thiết bị 12 năm.' },
                { text: 'Gia đình lớn/Văn phòng', tooltip: 'Phù hợp với hóa đơn điện 4-6 triệu/tháng, dùng nhiều điện ban đêm.' }
            ]
        },
        'HYB-10K-P': {
            id: 'HYB-10K-P',
            name: 'Combo hybrid 10kW lưu trữ 15kWh cao cấp',
            kwp: 10,
            type: 'hybrid' as const,
            priceOriginal: 96000000,
            priceFinal: 130000000,
            batteryCapacity: 15,
            features: [
                { text: 'Inverter Hybrid cao cấp 10kW + Pin 15kWh', tooltip: 'Hệ thống cao cấp nhất với dung lượng lưu trữ lớn, đảm bảo điện 24/7.' },
                { text: 'Tấm pin Mono PERC 500W (20 tấm)', tooltip: 'Công nghệ tế bào quang điện mới nhất, hiệu suất cao >21%.' },
                { text: 'Bảo hành 12-25 năm', tooltip: 'Bảo hành hiệu suất tấm pin lên đến 25 năm, thiết bị 12 năm.' },
                { text: 'Biệt thự/Kinh doanh', tooltip: 'Phù hợp với hóa đơn điện >6 triệu/tháng, nhu cầu sử dụng điện liên tục.' }
            ]
        }
    }
} as const;

export type PackageId = 'ONG-6K' | 'ONG-8K' | 'ONG-10K' | 'HYB-6K-S' | 'HYB-8K-P' | 'HYB-10K-P';
export type SystemType = 'ongrid' | 'hybrid';

export interface PackageDefinition {
    id: PackageId;
    name: string;
    kwp: number;
    type: SystemType;
    priceOriginal: number;
    priceFinal: number;
    batteryCapacity: number;
    features: Array<{ text: string; tooltip: string }>;
}
