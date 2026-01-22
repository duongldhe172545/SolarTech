# Giải thích: Tại sao "Tiết kiệm/tháng" không thay đổi khi điều chỉnh input?

## 🎯 Câu hỏi của bạn

> "Sao tôi chỉnh tiền điện, kích thước mái,... thì cái tiết kiệm hàng tháng ở combo vẫn thế? Thế nó phụ thuộc vào cái gì?"

---

## ✅ Trả lời ngắn gọn

**Tiết kiệm/tháng của mỗi gói CHỈ phụ thuộc vào**:

1. ✅ **Công suất gói** (6kWp, 8kWp, 10kWp) - CỐ ĐỊNH theo gói
2. ✅ **Giờ nắng** (`solarData.averageSunHours`) - Đổi theo địa chỉ
3. ✅ **% Sử dụng ban ngày** (`usageHours` slider) - Bạn điều chỉnh được
4. ✅ **Giá điện** - CỐ ĐỊNH 2,800 VND/kWh

**KHÔNG phụ thuộc**:
- ❌ `monthlyBill` (Tiền điện hàng tháng)
- ❌ `roofArea` trực tiếp (chỉ dùng để lọc gói nào vừa mái)

---

## 📊 Công thức tính

```typescript
// File: PricingCards.tsx - Line 39-42

// Bước 1: Sản lượng điện/ngày
dailyGeneration = pkg.kwp × solarData.averageSunHours × 0.8

// Bước 2: Hệ số sử dụng
usageFactor = (pkg.type === 'ongrid') ? (usageHours / 100) : 1.0

// Bước 3: Tiết kiệm/ngày
dailySavings = dailyGeneration × usageFactor × 2800 VND/kWh

// Bước 4: Tiết kiệm/tháng
monthlySavings = dailySavings × 30
```

---

## 🔍 Vai trò của từng input

### 1. `monthlyBill` (Tiền điện/tháng)

**Chỉ dùng để**: Tính gói nên đề xuất

```typescript
// Line 18-22: Tính gói phù hợp
const monthlyKwhNeeded = monthlyBill / 2800;  // kWh cần/tháng
const neededSystemSize = ...  // Tính kWp cần thiết

// KHÔNG ảnh hưởng đến công thức tiết kiệm!
```

**Ví dụ**:
- Bạn nhập `monthlyBill = 3 triệu` → Hệ thống đề xuất gói 6kWp
- Bạn nhập `monthlyBill = 6 triệu` → Hệ thống đề xuất gói 10kWp

→ **GÓI KHÁC** → **TIẾT KIỆM KHÁC**  
→ Nhưng nếu gói không đổi → Tiết kiệm không đổi!

---

### 2. `roofArea` (Diện tích mái)

**Chỉ dùng để**: Lọc gói nào vừa mái

```typescript
// Line 16: Tính công suất tối đa vừa mái
const MAX_KWP_FOR_ROOF = area / 6;  // 6m² cho 1kWp

// Line 45: Kiểm tra gói có vừa không
const fitsRoof = pkg.kwp <= MAX_KWP_FOR_ROOF;
```

**Ví dụ**:
- Mái 36m² → Tối đa 6kWp → Chỉ hiện gói ≤ 6kWp
- Mái 60m² → Tối đa 10kWp → Hiện tất cả gói

→ **KHÔNG ảnh hưởng** đến công thức tiết kiệm của mỗi gói!

---

### 3. `usageHours` (% Dùng ban ngày)

**Ảnh hưởng trực tiếp** đến tiết kiệm với gói **OnGrid**!

```typescript
const usageFactor = pkg.type === 'ongrid' ? (usageHours / 100) : 1.0;
```

**Ví dụ - Gói OnGrid 6kWp**:
- **30% ban ngày**: Tiết kiệm = 19.68 kWh × 0.3 × 2800 = **16,531 VND/ngày**
- **70% ban ngày**: Tiết kiệm = 19.68 kWh × 0.7 × 2800 = **38,573 VND/ngày**

→ **ĐỔI SLIDER → TIẾT KIỆM ĐỔI!**

---

### 4. Địa chỉ (ảnh hưởng `solarData.averageSunHours`)

**Ảnh hưởng trực tiếp**!

```typescript
dailyGeneration = pkg.kwp × solarData.averageSunHours × 0.8
```

**Ví dụ - Gói 6kWp**:
- **Hà Nội** (4.1h nắng): Tiết kiệm = 6 × 4.1 × 0.8 × 2800 = **55,104 VND/ngày**
- **Nha Trang** (5.5h nắng): Tiết kiệm = 6 × 5.5 × 0.8 × 2800 = **73,920 VND/ngày**

→ **ĐỔI ĐỊA CHỈ → TIẾT KIỆM ĐỔI!**

---

## 🧪 Thử nghiệm

### Kịch bản 1: Đổi monthlyBill từ 3 triệu → 6 triệu

```
TRƯỚC:
- monthlyBill: 3,000,000 VND
- Gói đề xuất: 6kWp
- Tiết kiệm/tháng: 1,650,000 VND

SAU (đổi monthlyBill → 6 triệu):
- monthlyBill: 6,000,000 VND
- Gói đề xuất: 10kWp ← GÓI ĐỔI!
- Tiết kiệm/tháng: 2,750,000 VND ← TIẾT KIỆM ĐỔI!
```

**Kết luận**: `monthlyBill` ảnh hưởng gián tiếp (qua việc chọn gói khác)

---

### Kịch bản 2: Đổi monthlyBill nhưng gói vẫn vậy

```
TRƯỚC:
- monthlyBill: 3,000,000 VND
- Gói đề xuất: 6kWp
- Tiết kiệm/tháng: 1,650,000 VND

SAU (đổi monthlyBill → 3.5 triệu):
- monthlyBill: 3,500,000 VND
- Gói đề xuất: 6kWp ← VẪN 6kWp!
- Tiết kiệm/tháng: 1,650,000 VND ← KHÔNG ĐỔI!
```

**Kết luận**: Nếu gói đề xuất không đổi → Tiết kiệm không đổi!

---

### Kịch bản 3: Đổi roofArea

```
TRƯỚC:
- roofArea: 60m² (max 10kWp)
- Gói đề xuất: 6kWp
- Tiết kiệm/tháng: 1,650,000 VND

SAU (đổi roofArea → 30m²):
- roofArea: 30m² (max 5kWp)
- Gói đề xuất: ??? (có thể không vừa gói 6kWp)
- Tiết kiệm/tháng: ??? (tùy gói mới)
```

**Kết luận**: `roofArea` chỉ ảnh hưởng nếu làm thay đổi gói đề xuất

---

### Kịch bản 4: Đổi usageHours slider

```
TRƯỚC (OnGrid 6kWp):
- usageHours: 50%
- Tiết kiệm/ngày: 27,552 VND
- Tiết kiệm/tháng: 826,560 VND

SAU (đổi slider → 80%):
- usageHours: 80%
- Tiết kiệm/ngày: 44,083 VND ← ĐỔI!
- Tiết kiệm/tháng: 1,322,496 VND ← ĐỔI!
```

**Kết luận**: Slider % dùng ban ngày ảnh hưởng trực tiếp với OnGrid!

---

## 💡 Tóm lại

### Input CÓ ảnh hưởng trực tiếp:
1. ✅ **Slider % dùng ban ngày** (chỉ với OnGrid)
2. ✅ **Địa chỉ** (qua `solarData.averageSunHours`)

### Input CÓ ảnh hưởng gián tiếp:
3. ⚠️ **Tiền điện/tháng** → Quyết định gói đề xuất
4. ⚠️ **Diện tích mái** → Lọc gói phù hợp

### Cố định:
5. 🔒 **Công suất gói** (6, 8, 10 kWp) - Thuộc gói
6. 🔒 **Giá điện** (2,800 VND/kWh) - Hằng số
7. 🔒 **Hiệu suất** (80%) - Hằng số

---

## 📍 Vị trí code

**File**: [`PricingCards.tsx`](file:///d:/solar-landing-bw%20(2)/src/features/calculator/components/PricingCards.tsx)

- **Line 13**: Props nhận vào (`area`, `monthlyBill`, `solarData`, `usageHours`)
- **Line 18-22**: Tính gói phù hợp từ `monthlyBill`
- **Line 39-42**: Công thức tính tiết kiệm (KHÔNG dùng `monthlyBill`)
- **Line 61-128**: Logic chọn gói đề xuất

---

## ✅ Đã thêm: "Kết quả tài chính" vào Dashboard

Bạn sẽ thấy card **"Tiết kiệm tối đa"** mới trong phần "Phân tích tiềm năng" hiển thị:

- 💰 **Tiết kiệm/ngày**: Dựa trên công suất tối đa lắp được (roofArea / 6)
- 📊 **Tiết kiệm/tháng**: × 30 ngày
- 📏 **Công suất**: Hiển thị kWp tối đa

**Card này SẼ ĐỔI** khi bạn:
- Thay đổi diện tích mái (vẽ lại)
- Đổi địa chỉ (giờ nắng khác)

---

## ❓ Câu hỏi thường gặp

### Q: Tại sao không dùng `monthlyBill` để tính tiết kiệm?

**A**: Vì tiết kiệm phụ thuộc vào **SẢN LƯỢNG** hệ thống tạo ra, không phải hóa đơn tiền điện. Một hệ thống 6kWp luôn tạo ra cùng một lượng điện bất kể bạn đang trả 3 triệu hay 6 triệu/tháng.

### Q: Vậy `monthlyBill` dùng để làm gì?

**A**: Để **TƯ VẤN GÓI PHÙ HỢP**. Nếu bạn trả 6 triệu/tháng, nghĩa là dùng nhiều điện, cần gói lớn hơn. Nhưng khi đã chọn gói rồi, tiết kiệm chỉ phụ thuộc vào gói đó.

### Q: Tại sao không tính theo hóa đơn thực tế?

**A**: Có thể! Nhưng cần thêm logic phức tạp:
- Tính bậc thang điện chính xác
- Tính % tự sản xuất vs mua lưới
- Xét trường hợp bán điện thừa

Hiện tại dùng công thức đơn giản: `Tiết kiệm = Sản lượng × Giá`

---

Bạn có muốn tôi thêm tính năng tính theo hóa đơn thực tế không? 🤔
