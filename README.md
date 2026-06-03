# Japan Trip Planner

AI-powered trip itinerary generator for Japan. Enter your dates, cities and
preferences, get a day-by-day plan with full transit connections, plus an
automatic "is a JR Pass worth it?" calculation.

## Features
- **Smart itinerary** — per-day plan (sights, food, transit) from your dates,
  cities, budget, pace and interests, generated via Google Gemini (structured JSON)
- **Deep transit integration** — each leg shows stations (incl. Japanese names),
  train name & type, departure/arrival times, and fare
- **JR Pass calculator** — auto-computes whether buying a JR Pass pays off
- **Bilingual** — Chinese & English (i18next)

## Tech
- **Frontend**: React + Vite, TanStack Query, i18next
- **Backend**: see `backend/`
- **AI**: Google Gemini API

## Getting started (frontend)
```bash
cd frontend
npm install
npm run dev
```

See `PRODUCT.md` for the full product spec.

## License
MIT
