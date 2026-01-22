# Giải thích Chi tiết: Công thức Tính toán & Hiển thị

## Vấn đề 1: "Kết quả tài chính" không hiển thị

### Nguyên nhân:
Component `DailySavingsBlock.tsx` **TỒN TẠI** nhưng **KHÔNG ĐƯỢC SỬ DỤNG** trong `ResultsDashboard.tsx`!

### Hiện trạng:
File [`ResultsDashboard.tsx`](file:///d:/solar-landing-bw%20(2)/src/features/calculator/components/ResultsDashboard.tsx) chỉ hiển thị 4 thông số:

1. ✅ **Bức xạ mặt trời (GHI)** - line 24-37
2. ✅ **Giờ nắng trung bình** - line 39-54  
3. ✅ **Diện tích mái hiệu dụng** - line 56-69
4. ✅ **Đánh giá tiềm năng** - line 71-84

**❌ THIẾU: Kết quả tài chính (Tiền tiết kiệm/ngày)**

### Giải pháp:
Cần **TẠO LẠI** hoặc **TÍCH HỢP** block "Kết quả tài chính" vào `ResultsDashboard.tsx`.

File có sẵn: [`DailySavingsBlock.tsx`](file:///d:/solar-landing-bw%20(2)/src/features/calculator/components/DailySavingsBlock.tsx) 

---

## Vấn đề 2: Công thức tính "Tiết kiệm/tháng, ROI"

### Vị trí code:
File: [`PricingCards.tsx`](file:///d:/solar-landing-bw%20(2)/src/features/calculator/components/PricingCards.tsx) - **Line 36-54**

---

## Chi tiết Công thức

### Constants (Hằng số)
File: [`pricing.constants.ts`](file:///d:/solar-landing-bw%20(2)/src/features/calculator/constants/pricing.constants.ts)

```typescript
ELECTRICITY_PRICE_AVG: 2800,  // VND/kWh - Giá điện bình quân
EFFICIENCY: 0.8,              // 80% - Hiệu suất hệ thống
SQM_PER_KWP: 6,              // 6m² - Diện tích cần cho 1 kWp
```

---

### Bước 1: Tính Sản lượng điện hàng ngày

**Location**: `PricingCards.tsx` - Line 39

```typescript
const dailyGeneration = pkg.kwp * solarData.averageSunHours * EFFICIENCY;
```

**Ví dụ**: Combo 6kWp tại Hà Nội
```
dailyGeneration = 6 kWp × 4.1 giờ/ngày × 0.8
                = 19.68 kWh/ngày
```

**Giải thích**:
- `pkg.kwp`: Công suất tối đa hệ thống (6 kWp)
- `solarData.averageSunHours`: Giờ nắng trung bình/ngày (4.1h ở Hà Nội)
- `EFFICIENCY`: Hiệu suất thực tế = 80% (do mất mát qua inverter, dây dẫn, bụi...)

---

### Bước 2: Tính Hệ số sử dụng

**Location**: `PricingCards.tsx` - Line 40

```typescript
const usageFactor = pkg.type === 'ongrid' ? (usageHours / 100) : 1.0;
```

**Giải thích**:

#### Hệ OnGrid (Hòa lưới):
- Chỉ tiết kiệm khi **tự dùng**, không dùng thì bán lại lưới (giá thấp hơn)
- Nếu người dùng chọn **50% dùng ban ngày**:
  ```
  usageFactor = 50 / 100 = 0.5
  ```
  → Chỉ tiết kiệm **50%** sản lượng điện

#### Hệ Hybrid (Có pin):
- Điện thừa ban ngày → Lưu vào pin → Dùng ban đêm
- **usageFactor = 1.0** (100%)
  → Tiết kiệm **TOÀN BỘ** sản lượng điện

**Ví dụ**:
- OnGrid + 50% dùng ban ngày: `usageFactor = 0.5`
- Hybrid: `usageFactor = 1.0`

---

### Bước 3: Tính Tiết kiệm hàng ngày

**Location**: `PricingCards.tsx` - Line 41

```typescript
const dailySavings = dailyGeneration * usageFactor * ELECTRICITY_PRICE_AVG;
```

**Ví dụ 1 - OnGrid 6kWp, 50% dùng ban ngày**:
```
dailySavings = 19.68 kWh × 0.5 × 2,800 VND/kWh
             = 27,552 VND/ngày
             ≈ 28,000 VND/ngày
```

**Ví dụ 2 - Hybrid 6kWp**:
```
dailySavings = 19.68 kWh × 1.0 × 2,800 VND/kWh
             = 55,104 VND/ngày
             ≈ 55,000 VND/ngày
```

**→ Hybrid tiết kiệm GẤP ĐÔI OnGrid vì dùng được toàn bộ sản lượng!**

---

### Bước 4: Tính Tiết kiệm hàng tháng

**Location**: `PricingCards.tsx` - Line 42

```typescript
const monthlySavings = dailySavings * 30;
```

**Ví dụ - Hybrid 6kWp**:
```
monthlySavings = 55,000 VND/ngày × 30 ngày
               = 1,650,000 VND/tháng
               ≈ 1.65 triệu/tháng
```

---

### Bước 5: Tính ROI (Hoàn vốn)

**Location**: `PricingCards.tsx` - Line 43-44

```typescript
const yearlySavings = monthlySavings * 12;
const roi = pkg.priceFinal / yearlySavings;
```

**Ví dụ - Hybrid 6kWp (giá 100 triệu)**:
```
yearlySavings = 1,650,000 VND/tháng × 12 tháng
              = 19,800,000 VND/năm
              ≈ 19.8 triệu/năm

roi = 100,000,000 VND / 19,800,000 VND/năm
    = 5.05 năm
    ≈ 5.1 năm
```

**→ Sau 5.1 năm, hệ thống hoàn vốn. Sau đó lãi ròng 19.8 triệu/năm!**

---

## Tóm tắt Công thức

```typescript
// 1. Sản lượng điện/ngày
dailyGeneration = Công suất (kWp) × Giờ nắng × Hiệu suất (80%)

// 2. Hệ số sử dụng
usageFactor = OnGrid ? (% dùng ban ngày / 100) : 1.0

// 3. Tiết kiệm/ngày
dailySavings = Sản lượng × Hệ số × Giá điện (2,800 VND/kWh)

// 4. Tiết kiệm/tháng
monthlySavings = Tiết kiệm/ngày × 30

// 5. ROI (năm)
roi = Giá gói / (Tiết kiệm/tháng × 12)
```

---

## Ví dụ Cụ thể: So sánh 3 kịch bản

### Kịch bản 1: OnGrid 6kWp - Dùng 30% ban ngày
```
Sản lượng: 6 × 4.1 × 0.8 = 19.68 kWh/ngày
Hệ số: 0.3
Tiết kiệm/ngày: 19.68 × 0.3 × 2800 = 16,531 VND
Tiết kiệm/tháng: 16,531 × 30 = 495,930 VND
ROI: 50,000,000 / (495,930 × 12) = 8.4 năm
```

### Kịch bản 2: OnGrid 6kWp - Dùng 70% ban ngày
```
Sản lượng: 19.68 kWh/ngày
Hệ số: 0.7
Tiết kiệm/ngày: 19.68 × 0.7 × 2800 = 38,573 VND
Tiết kiệm/tháng: 38,573 × 30 = 1,157,190 VND
ROI: 50,000,000 / (1,157,190 × 12) = 3.6 năm
```

### Kịch bản 3: Hybrid 6kWp - Dùng 100%
```
Sản lượng: 19.68 kWh/ngày
Hệ số: 1.0
Tiết kiệm/ngày: 19.68 × 1.0 × 2800 = 55,104 VND
Tiết kiệm/tháng: 55,104 × 30 = 1,653,120 VND
ROI: 100,000,000 / (1,653,120 × 12) = 5.0 năm
```

**Kết luận**:
- OnGrid 30% ban ngày: ROI = 8.4 năm ❌ Lâu
- OnGrid 70% ban ngày: ROI = 3.6 năm ✅ Tốt
- Hybrid 100%: ROI = 5.0 năm ✅ Tốt (nhưng đắt hơn)

---

## Vị trí Hiển thị trong UI

### PricingCards.tsx - Line 206-224

```typescript
// CHI TIẾT HIỂN THỊ CỦA GÓI ĐỀ XUẤT:

<div className="grid grid-cols-2 gap-4 mb-6">
    {/* Chi phí đầu tư */}
    <div>Chi phí: {formatMoney(priceFinal)}</div>
    
    {/* Tiết kiệm/tháng - Line 212-215 */}
    <div>Tiết kiệm/tháng: {formatMoney(monthlySavings)}</div>
    
    {/* Tiết kiệm/ngày - Line 216-219 */}
    <div>Tiết kiệm/ngày: {formatMoney(dailySavings)}</div>
    
    {/* ROI - Line 220-223 */}
    <div>Hoàn vốn: {roi} năm</div>
</div>
```

---

## Câu hỏi Thường gặp

### Q1: Tại sao Hybrid lại tiết kiệm được 100%?
**A1**: Vì có pin! Điện thừa ban ngày → Lưu vào pin → Dùng ban đêm. Không lãng phí.

### Q2: OnGrid % dùng ban ngày tính từ đâu?
**A2**: Người dùng chọn trên slider "Mức dùng ban ngày (6H-18H)" trong form.

### Q3: Tại sao efficiency chỉ 80%?
**A3**: 
- Inverter mất 5-10%
- Dây dẫn mất 2-3%
- Bụi/nhiệt độ mất 5-10%
- **Tổng: ~20% loss → 80% efficiency**

### Q4: Giá điện 2,800 VND/kWh có đúng không?
**A4**: Là giá **bình quân**. Thực tế:
- Bậc 1 (0-50 kWh): 1,728 VND/kWh
- Bậc 2-3: 2,000-3,000 VND/kWh
- Bậc 4-6: 3,000-4,000 VND/kWh
- **Trung bình gia đình VN: ~2,800 VND/kWh**

---

## File liên quan

1. [`PricingCards.tsx`](file:///d:/solar-landing-bw%20(2)/src/features/calculator/components/PricingCards.tsx) - Hiển thị gói và tính toán
2. [`pricing.constants.ts`](file:///d:/solar-landing-bw%20(2)/src/features/calculator/constants/pricing.constants.ts) - Hằng số giá
3. [`ResultsDashboard.tsx`](file:///d:/solar-landing-bw%20(2)/src/features/calculator/components/ResultsDashboard.tsx) - Dashboard phân tích (THIẾU financial)
4. [`DailySavingsBlock.tsx`](file:///d:/solar-landing-bw%20(2)/src/features/calculator/components/DailySavingsBlock.tsx) - Component tài chính (KHÔNG DÙNG)

---

## Hành động cần làm

Bạn muốn tôi:

1. ✅ **Thêm block "Kết quả tài chính"** vào ResultsDashboard?
2. ✅ **Sửa lại công thức** nếu có gì không đúng?
3. ✅ **Giải thích thêm** phần nào chưa rõ?
