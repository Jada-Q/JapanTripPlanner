"""
Fetch real thumbnail URLs from Wikipedia REST API.

Strategy:
  AI returns `wikipedia_slug` (e.g. "Sensō-ji", "Fushimi Inari-taisha")
  → We call  GET https://en.wikipedia.org/api/rest_v1/page/summary/{slug}
  → Extract  response.thumbnail.source  (reliable CDN URL)

This avoids AI-hallucinated image URLs that return 404.
"""

import asyncio
import logging
from urllib.parse import quote

import httpx

logger = logging.getLogger(__name__)

WIKIPEDIA_API = "https://en.wikipedia.org/api/rest_v1/page/summary"
TIMEOUT = 8.0  # seconds per request
# Wikipedia REST API requires a proper User-Agent header (returns 403 without it)
HEADERS = {"User-Agent": "JapanTripPlanner/1.0 (https://github.com/japan-trip-planner)"}


async def fetch_thumbnail(slug: str, client: httpx.AsyncClient) -> str | None:
    """Fetch a single Wikipedia thumbnail URL for the given article slug."""
    if not slug:
        return None

    encoded = quote(slug, safe="")
    url = f"{WIKIPEDIA_API}/{encoded}"

    try:
        resp = await client.get(url)
        if resp.status_code == 200:
            data = resp.json()
            thumb = data.get("thumbnail", {})
            source = thumb.get("source")
            if source:
                logger.debug(f"Wikipedia photo for '{slug}': {source}")
                return source
            # Article exists but has no thumbnail
            logger.info(f"No thumbnail for Wikipedia article: {slug}")
            return None
        elif resp.status_code == 404:
            logger.warning(f"Wikipedia article not found: {slug}")
            return None
        else:
            logger.warning(f"Wikipedia API returned {resp.status_code} for: {slug}")
            return None
    except Exception as e:
        logger.warning(f"Wikipedia fetch failed for '{slug}': {e}")
        return None


async def resolve_photo_urls(activities_by_day: list[list[dict]]) -> None:
    """
    Resolve wikipedia_slug → photo_url for all activities in-place.

    Parameters:
        activities_by_day: list of days, each containing a list of activity dicts.
                          Each activity may have a 'wikipedia_slug' key.
                          This function sets 'photo_url' and removes 'wikipedia_slug'.
    """
    # Collect all (day_idx, act_idx, slug) tuples
    tasks: list[tuple[int, int, str]] = []
    for day_idx, activities in enumerate(activities_by_day):
        for act_idx, act in enumerate(activities):
            slug = act.get("wikipedia_slug")
            if slug:
                tasks.append((day_idx, act_idx, slug))

    if not tasks:
        return

    logger.info(f"Resolving {len(tasks)} Wikipedia thumbnails...")

    async with httpx.AsyncClient(timeout=TIMEOUT, follow_redirects=True, headers=HEADERS) as client:
        # Fetch all thumbnails concurrently (with semaphore to be polite)
        semaphore = asyncio.Semaphore(10)

        async def _fetch(slug: str) -> str | None:
            async with semaphore:
                return await fetch_thumbnail(slug, client)

        results = await asyncio.gather(
            *[_fetch(slug) for _, _, slug in tasks],
            return_exceptions=True,
        )

    # Apply results back to the activity dicts
    resolved = 0
    for (day_idx, act_idx, slug), result in zip(tasks, results):
        act = activities_by_day[day_idx][act_idx]
        if isinstance(result, str):
            act["photo_url"] = result
            resolved += 1
        else:
            act["photo_url"] = None

        # Remove the slug field — it's not part of the Pydantic model
        act.pop("wikipedia_slug", None)

    logger.info(f"Resolved {resolved}/{len(tasks)} Wikipedia thumbnails successfully")
