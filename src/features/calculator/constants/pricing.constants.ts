// Pricing constants for solar system packages
export const PRICING = {
    // Electricity pricing
    ELECTRICITY_PRICE_AVG: 2800, // VND/kWh
    PRICE_PER_KWP: 15000000, // VND per kWp

    // System efficiency
    PERFORMANCE_RATIO: 0.75,

    // Area requirements
    SQM_PER_KWP: 6, // m² per kWp

    // Package definitions
    PACKAGES: {
        SAVER: {
            name: 'Gói Tiết Kiệm',
            kwp: 3,
            type: 'SAVER' as const,
            features: [
                { text: 'Inverter hòa lưới cơ bản', tooltip: 'Thiết bị chuyển đổi điện DC sang AC, tự động hòa lưới điện quốc gia.' },
                { text: 'Tấm pin Tier 1 (450W)', tooltip: 'Top 10 nhà sản xuất pin lớn nhất thế giới, hiệu suất >20%.' },
                { text: 'Bảo hành 5 năm', tooltip: 'Bảo hành vật lý cho toàn bộ hệ thống.' },
                { text: 'Phù hợp gia đình nhỏ', tooltip: 'Dành cho hóa đơn điện < 1.5 triệu/tháng.' }
            ]
        },
        STANDARD: {
            name: 'Gói Phổ Thông',
            kwp: 5,
            type: 'STANDARD' as const,
            features: [
                { text: 'Inverter thông minh (Wifi)', tooltip: 'Theo dõi sản lượng điện qua ứng dụng điện thoại mọi lúc mọi nơi.' },
                { text: 'Tấm pin Mono Perc (550W)', tooltip: 'Công nghệ tế bào quang điện mới nhất, hoạt động tốt khi trời râm.' },
                { text: 'Bảo hành 10 năm', tooltip: 'Cam kết chất lượng dài hạn cho thiết bị chính.' },
                { text: 'Tối ưu cho gia đình 4-5 người', tooltip: 'Dành cho hóa đơn điện 2 - 4 triệu/tháng.' }
            ]
        },
        PREMIUM: {
            name: 'Gói Cao Cấp',
            kwp: 10,
            type: 'PREMIUM' as const,
            features: [
                { text: 'Inverter Hybrid cao cấp', tooltip: 'Có khả năng kết hợp pin lưu trữ, hoạt động khi mất điện lưới.' },
                { text: 'Tấm pin Bifacial 2 mặt', tooltip: 'Hấp thụ ánh sáng từ cả mặt sau, tăng 15% sản lượng.' },
                { text: 'Bảo hành 12-25 năm', tooltip: 'Bảo hành hiệu suất tấm pin lên đến 25 năm.' },
                { text: 'Dành cho biệt thự/kinh doanh', tooltip: 'Dành cho hóa đơn điện > 5 triệu/tháng.' }
            ]
        }
    }
} as const;

export type PackageType = 'SAVER' | 'STANDARD' | 'PREMIUM';
