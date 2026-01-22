# Mapbox Setup Guide

## 🎯 What Changed

Your solar calculator now uses **Mapbox Satellite** imagery instead of Google Maps, which provides:
- ✅ **Higher resolution** (50cm/pixel) - Much better roof visibility
- ✅ **More frequent updates** (every 3-6 months)
- ✅ **FREE tier**: 200,000 map tile requests/month
- ✅ **Multi-source switcher**: Choose between Mapbox, Google Maps, or Esri

---

## 🔧 Setup Instructions

### Step 1: Get Your Mapbox API Token (FREE)

1. **Sign up for Mapbox** (no credit card required):
   - Go to: https://account.mapbox.com/auth/signup/
   - Create a free account

2. **Get your access token**:
   - After signing up, go to: https://account.mapbox.com/access-tokens/
   - Copy your **default public token** (starts with `pk.`)

### Step 2: Add Token to Your Project

1. **Open the file**: `.env.local` (in your project root)

2. **Replace the placeholder** with your actual token:
   ```bash
   # Replace this line:
   VITE_MAPBOX_TOKEN=pk.your_actual_token_will_go_here
   
   # With your real token:
   VITE_MAPBOX_TOKEN=pk.eyJ1Ijoi...your_actual_token_here
   ```

3. **Save the file**

### Step 3: Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 🎨 How to Use

### Switching Between Satellite Sources

In the calculator map, you'll see a **layer switcher** dropdown in the top toolbar:

1. **Mapbox Satellite** (Default) - Highest quality, recommended
2. **Google Hybrid** - Satellite + street labels
3. **Google Satellite** - Pure satellite imagery
4. **Esri World Imagery** - Alternative high-quality source

**Tip**: Try different sources to see which one shows your target location most clearly!

---

## 🚀 Features Added

1. **Multi-source layer switcher** - Compare different satellite imagery
2. **Higher max zoom** - Increased from 22 to 23 for better detail
3. **Auto-fallback** - If you don't add a token, it uses a demo token (limited requests)
4. **Smart caching** - Tiles are cached in browser for faster loading

---

## ⚠️ Important Notes

### Free Tier Limits

- **200,000 tile requests/month** (plenty for development)
- Each map pan/zoom loads ~10-30 tiles
- Estimated: ~5,000-10,000 user sessions per month before hitting limit

### Security

- ✅ `.env.local` is already added to `.gitignore`
- ✅ Your token won't be committed to git
- ✅ Use **public token** (starts with `pk.`) - safe for client-side use

### If You Don't Add a Token

The map will work with a **fallback demo token**, but:
- ⚠️ Limited to a few hundred requests
- ⚠️ May stop working if too many people use it
- ✅ **Solution**: Just add your free token!

---

## 🧪 Testing Checklist

After setup, verify:

- [ ] Map loads with Mapbox satellite imagery
- [ ] Layer switcher dropdown works
- [ ] Can switch between all 4 satellite sources
- [ ] Drawing polygon on roof still works
- [ ] Zoom level goes up to 23 (very detailed)
- [ ] No console errors about Mapbox token

---

## 📊 Comparing Image Quality

Test various Vietnamese addresses:

**Urban areas** (should be high quality):
- Hanoi: 37 Lê Văn Thiêm, Thanh Xuân
- Ho Chi Minh City: Bitexco Financial Tower
- Da Nang: Cầu Rồng

**Compare**:
1. Open calculator
2. Search for address
3. Try different layer sources
4. Pick the clearest one for your roof measurement

You should notice **Mapbox** and **Esri** provide significantly better detail than Google Maps for residential areas.

---

## 🆘 Troubleshooting

### Map shows blank/gray tiles

**Problem**: Invalid or missing Mapbox token

**Solution**:
1. Check `.env.local` has correct token format: `pk.ey...`
2. Restart dev server: `npm run dev`
3. Clear browser cache (Ctrl+Shift+Delete)

### "Failed to load tile" errors

**Problem**: Network/CORS issues or token quota exceeded

**Solution**:
1. Check internet connection
2. Try switching to a different satellite layer
3. Verify token is valid at https://account.mapbox.com/access-tokens/

### Map is too slow/laggy

**Problem**: Too many tile requests

**Solution**:
1. Disable layer switching while users are drawing
2. Increase tile cache time
3. Consider using vector tiles for UI overlays

---

## 🎓 Next Steps

Once verified, you can:

1. **Monitor usage**: Check tile requests at https://account.mapbox.com/
2. **Upgrade if needed**: Mapbox offers paid plans for higher limits
3. **Add more features**:
   - Show imagery capture date on hover
   - Add measurement units toggle (m² vs ft²)
   - Integrate Street View for ground-level roof photos

---

Need help? Check:
- Mapbox Docs: https://docs.mapbox.com/
- This project's issues: (your GitHub repo)
