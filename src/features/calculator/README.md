# Calculator Feature

Professional solar calculation module với feature-based architecture.

## Structure

```
calculator/
├── components/          # UI Components
│   ├── AdvancedCalculator.tsx    # Main wrapper
│   ├── MapSelector.tsx            # Interactive map
│   ├── PricingCards.tsx           # Dynamic pricing packages
│   ├── ResultsDashboard.tsx       # Solar metrics display
│   └── index.ts
├── services/            # Business Logic
│   ├── api/             # External API calls
│   │   ├── geocoding.api.ts       # Nominatim geocoding
│   │   ├── solar.api.ts           # Solar data (simulated)
│   │   └── index.ts
│   └── calculations/    # Pure functions
│       ├── polygon.ts             # Area/perimeter calculations
│       ├── solar.ts               # Solar generation/ROI
│       ├── pricing.ts             # Package price calculations
│       └── index.ts
├── types/               # TypeScript definitions
│   ├── calculator.types.ts
│   └── index.ts
├── constants/           # Configuration
│   ├── pricing.constants.ts       # Pricing rules & packages
│   ├── solar.constants.ts         # Solar constants (GHI, etc.)
│   ├── map.constants.ts           # Map config
│   └── index.ts
└── index.ts             # Barrel export
```

## Usage

```tsx
// Import main component
import AdvancedCalculator from '@/features/calculator';

// Use in page
<AdvancedCalculator />

// Import specific utilities
import { calculateROI } from '@/features/calculator';
import { PRICING } from '@/features/calculator';
```

## Key Features

- **Modular Design**: Clear separation of UI, logic, and data
- **Pure Functions**: Calculation logic is testable and reusable
- **API Ready**: Easy to swap mock API for real backend
- **Type Safe**: Full TypeScript support
- **Maintainable**: Each file < 200 lines, single responsibility

## Future Backend Integration

When adding real API:

```ts
// src/features/calculator/services/api/solar.api.ts
export const solarApi = {
  fetchSolarData: async (lat: number, lng: number) => {
    const response = await apiClient.get(`/api/solar/${lat}/${lng}`);
    return response.data;
  }
};
```

Components don't need any changes!
