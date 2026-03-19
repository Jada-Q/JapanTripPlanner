from datetime import date

SEASONAL_EVENTS = [
    # Cherry Blossom
    {
        "name_en": "Cherry Blossoms (Tokyo)",
        "name_ja": "桜 (東京)",
        "name_zh": "樱花季 (东京)",
        "month_start": 3, "day_start": 20, "month_end": 4, "day_end": 5,
        "cities": ["tokyo"], "type": "nature",
        "tip_en": "Best spots: Ueno Park, Shinjuku Gyoen, Chidorigafuchi. Full bloom ~Mar 27.",
        "tip_zh": "最佳赏樱点：上野公园、新宿御苑、千鸟渊。满开约3月27日。",
    },
    {
        "name_en": "Cherry Blossoms (Kyoto)",
        "name_ja": "桜 (京都)",
        "name_zh": "樱花季 (京都)",
        "month_start": 3, "day_start": 25, "month_end": 4, "day_end": 10,
        "cities": ["kyoto"], "type": "nature",
        "tip_en": "Best spots: Maruyama Park, Philosopher's Path, Arashiyama. Full bloom ~Apr 1.",
        "tip_zh": "最佳赏樱点：圆山公园、哲学之道、岚山。满开约4月1日。",
    },
    {
        "name_en": "Cherry Blossoms (Osaka)",
        "name_ja": "桜 (大阪)",
        "name_zh": "樱花季 (大阪)",
        "month_start": 3, "day_start": 25, "month_end": 4, "day_end": 8,
        "cities": ["osaka"], "type": "nature",
        "tip_en": "Best spots: Osaka Castle Park, Kema Sakuranomiya Park.",
        "tip_zh": "最佳赏樱点：大阪城公园、毛马樱之宫公园。",
    },
    # Autumn Leaves
    {
        "name_en": "Autumn Leaves (Kyoto)",
        "name_ja": "紅葉 (京都)",
        "name_zh": "红叶季 (京都)",
        "month_start": 11, "day_start": 10, "month_end": 12, "day_end": 5,
        "cities": ["kyoto"], "type": "nature",
        "tip_en": "Peak at Tofuku-ji, Eikan-do, Kiyomizu-dera. Night illumination events.",
        "tip_zh": "最佳赏枫点：东福寺、永观堂、清水寺。有夜间点灯活动。",
    },
    {
        "name_en": "Autumn Leaves (Tokyo)",
        "name_ja": "紅葉 (東京)",
        "name_zh": "红叶季 (东京)",
        "month_start": 11, "day_start": 15, "month_end": 12, "day_end": 10,
        "cities": ["tokyo"], "type": "nature",
        "tip_en": "Best spots: Meiji Jingu Gaien, Rikugien, Koishikawa Korakuen.",
        "tip_zh": "最佳赏枫点：明治神宫外苑银杏大道、六义园、小石川后乐园。",
    },
    # Major Festivals
    {
        "name_en": "Gion Matsuri",
        "name_ja": "祇園祭",
        "name_zh": "祇园祭",
        "month_start": 7, "day_start": 1, "month_end": 7, "day_end": 31,
        "cities": ["kyoto"], "type": "festival",
        "tip_en": "Main parade (Yamaboko Junko) on July 17 and 24. Night festival July 14-16.",
        "tip_zh": "主要巡游（山鉾巡行）7月17日和24日。宵山夜祭7月14-16日。",
    },
    {
        "name_en": "Tenjin Matsuri",
        "name_ja": "天神祭",
        "name_zh": "天神祭",
        "month_start": 7, "day_start": 24, "month_end": 7, "day_end": 25,
        "cities": ["osaka"], "type": "festival",
        "tip_en": "River boat procession and fireworks on July 25.",
        "tip_zh": "7月25日船渡御和烟花大会。",
    },
    {
        "name_en": "Sapporo Snow Festival",
        "name_ja": "さっぽろ雪まつり",
        "name_zh": "札幌雪祭",
        "month_start": 2, "day_start": 4, "month_end": 2, "day_end": 11,
        "cities": ["sapporo"], "type": "festival",
        "tip_en": "Giant snow and ice sculptures at Odori Park. Extremely cold, dress warmly.",
        "tip_zh": "大通公园巨型雪雕冰雕。极度寒冷，注意保暖。",
    },
    # Warning Periods
    {
        "name_en": "Golden Week",
        "name_ja": "ゴールデンウィーク",
        "name_zh": "黄金周",
        "month_start": 4, "day_start": 29, "month_end": 5, "day_end": 5,
        "cities": ["all"], "type": "warning",
        "tip_en": "Extremely crowded nationwide. Book Shinkansen and hotels months in advance.",
        "tip_zh": "全国极度拥挤。新干线和酒店需提前数月预订。",
    },
    {
        "name_en": "Obon Holiday",
        "name_ja": "お盆",
        "name_zh": "盂兰盆节",
        "month_start": 8, "day_start": 13, "month_end": 8, "day_end": 16,
        "cities": ["all"], "type": "warning",
        "tip_en": "Major domestic travel period. Shinkansen extremely crowded.",
        "tip_zh": "日本国内出行高峰期。新干线极度拥挤。",
    },
    {
        "name_en": "New Year Holiday",
        "name_ja": "年末年始",
        "name_zh": "新年假期",
        "month_start": 12, "day_start": 28, "month_end": 1, "day_end": 3,
        "cities": ["all"], "type": "warning",
        "tip_en": "Many shops/restaurants closed Dec 31 - Jan 3. Shrines very crowded for Hatsumode.",
        "tip_zh": "12月31日至1月3日很多店铺关门。神社初詣非常拥挤。",
    },
    {
        "name_en": "Rainy Season (Tsuyu)",
        "name_ja": "梅雨",
        "name_zh": "梅雨季",
        "month_start": 6, "day_start": 10, "month_end": 7, "day_end": 20,
        "cities": ["all"], "type": "warning",
        "tip_en": "Frequent rain, high humidity. Bring umbrella. Indoor activities recommended.",
        "tip_zh": "频繁降雨，高湿度。请带伞。推荐室内活动。",
    },
]


def get_events_for_date_range(start: date, end: date) -> list[str]:
    """Return relevant seasonal tips for a given date range."""
    results = []
    for event in SEASONAL_EVENTS:
        # Month-based overlap check (handles year-spanning trips like Dec 28 - Jan 3)
        if start.month <= end.month:
            trip_months = set(range(start.month, end.month + 1))
        else:
            # Trip spans year boundary (e.g., Dec → Jan)
            trip_months = set(range(start.month, 13)) | set(range(1, end.month + 1))

        if event["month_start"] <= event["month_end"]:
            event_months = set(range(event["month_start"], event["month_end"] + 1))
        else:
            # Event spans year boundary (e.g., Dec-Jan for New Year)
            event_months = set(range(event["month_start"], 13)) | set(range(1, event["month_end"] + 1))

        if trip_months & event_months:
            results.append(f"{event['name_en']} ({event['name_ja']}): {event['tip_en']}")
    return results


def get_seasonal_events(month: int | None = None) -> list[dict]:
    """Return all events, optionally filtered by month."""
    if month is None:
        return SEASONAL_EVENTS
    return [
        e for e in SEASONAL_EVENTS
        if e["month_start"] <= month <= e["month_end"]
        or (e["month_start"] > e["month_end"] and (month >= e["month_start"] or month <= e["month_end"]))
    ]
