# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Japan Trip Planner — AI-powered itinerary generator for Japan tourists. FastAPI backend + Next.js 16 frontend with shadcn/ui. Generates day-by-day itineraries with transport connections, JR Pass calculations, and venue photos.

## Development Commands

### Backend (FastAPI, port 8000)
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

### Frontend (Next.js, port 3000)
```bash
cd japan-trip-planner
npm install
npm run dev          # Dev with Turbopack
npm run build        # Production build
npm run lint         # ESLint
npm run format       # Prettier
npm run typecheck    # TypeScript check
```

### Both servers together
Use `.claude/launch.json` — Backend on :8000, Frontend on :3000.

## Architecture

```
Next.js Route Handlers (/app/api/v1/...)  →  FastAPI (/api/v1/...)
         ↓ proxy (3min timeout)                    ↓
                                          ItineraryService orchestrates:
                                            1. AIService → Kimi API (generates JSON)
                                            2. JRPassCalculator → deterministic cost analysis
                                            3. WikipediaService → resolves photo URLs
                                            4. setdefault() → fills missing AI fields
                                            5. Pydantic validation → Itinerary response
```

- **Next.js Route Handlers** proxy to backend (NOT `rewrites()` — those timeout on long AI requests)
- **AI provider**: Kimi (Moonshot) via OpenAI-compatible SDK, configured in `backend/.env`
- **Sync client workaround**: Kimi's async client has issues; uses `asyncio.to_thread()` wrapping sync `OpenAI` client
- **Wikipedia photos**: AI returns `wikipedia_slug`, backend resolves to real CDN thumbnail via REST API
- **JR Pass**: Pure deterministic calculation, not AI — in `jr_pass_calculator.py`
- **Seed data**: Cities, JR passes, train routes, seasonal events are Python dicts in `backend/app/data/`

## Critical Lessons (from production bugs)

1. **Never let AI generate URLs** — AI hallucinate plausible but nonexistent URLs (404s). Use AI for identifiers only (e.g., `wikipedia_slug`), resolve to real URLs in backend code.

2. **Always setdefault() ALL Pydantic fields before validation** — AI omits required JSON fields randomly (`name_ja`, `transport_segments`, etc.). The service layer in `itinerary_service.py` must provide defaults for every field, not just optional ones.

3. **Clean invalid nested objects** — AI returns `transport_to_next: {mode: null, duration: null}` instead of `null`. Check and nullify invalid nested dicts before Pydantic validation.

4. **pydantic-settings .env overrides code defaults** — Changing a default in `config.py` has no effect if `.env` has that key. Always update both.

5. **Next.js hydration + i18next** — Don't use `i18next-browser-languagedetector` with SSR. Read language from `localStorage` directly, use fixed default on server side.

6. **AI response timeouts** — Kimi can take 60-120s. Set axios timeout and Next.js Route Handler `AbortSignal.timeout` to 180s.

7. **Venue blacklist** — AI recommends permanently closed places. Maintain blacklist in `backend/app/prompts/system_prompt.py`.

## Key Files

| Purpose | File |
|---------|------|
| AI orchestration | `backend/app/services/itinerary_service.py` |
| AI prompt + JSON schema | `backend/app/services/ai_service.py` |
| System prompt (rules, blacklist, clustering) | `backend/app/prompts/system_prompt.py` |
| Photo resolution | `backend/app/services/wikipedia_service.py` |
| Backend config + .env | `backend/app/config.py`, `backend/.env` |
| API proxy (3min timeout) | `japan-trip-planner/app/api/v1/itinerary/generate/route.ts` |
| Main page | `japan-trip-planner/app/page.tsx` |
| Form component | `japan-trip-planner/components/trip-input/trip-input-form.tsx` |
| i18n setup | `japan-trip-planner/lib/i18n.ts` |
| Translations | `japan-trip-planner/locales/{en,zh}/translation.json` |
| Product spec + changelog | `PRODUCT.md` |

## Constraints

- Max 21 days, up to 8 cities per trip
- Chinese (zh) and English (en) only
- No database — stateless API
- Wikipedia API requires `User-Agent` header (returns 403 without it)
- Use `asyncio.Semaphore(10)` for concurrent Wikipedia requests
- `frontend/` directory is the old Vite app (superseded by `japan-trip-planner/`)
