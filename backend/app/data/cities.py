CITIES = [
    {
        "id": "tokyo",
        "name_en": "Tokyo",
        "name_ja": "東京",
        "name_zh": "东京",
        "region": "Kanto",
        "stations": [
            {"name_en": "Tokyo Station", "name_ja": "東京駅", "type": "shinkansen_hub"},
            {"name_en": "Shinagawa Station", "name_ja": "品川駅", "type": "shinkansen_hub"},
            {"name_en": "Ueno Station", "name_ja": "上野駅", "type": "shinkansen_hub"},
            {"name_en": "Shinjuku Station", "name_ja": "新宿駅", "type": "major"},
            {"name_en": "Shibuya Station", "name_ja": "渋谷駅", "type": "major"},
            {"name_en": "Ikebukuro Station", "name_ja": "池袋駅", "type": "major"},
        ],
        "recommended_days": {"min": 3, "max": 5},
        "airport_connections": ["NRT", "HND"],
    },
    {
        "id": "kyoto",
        "name_en": "Kyoto",
        "name_ja": "京都",
        "name_zh": "京都",
        "region": "Kansai",
        "stations": [
            {"name_en": "Kyoto Station", "name_ja": "京都駅", "type": "shinkansen_hub"},
        ],
        "recommended_days": {"min": 2, "max": 4},
        "airport_connections": ["KIX", "ITM"],
    },
    {
        "id": "osaka",
        "name_en": "Osaka",
        "name_ja": "大阪",
        "name_zh": "大阪",
        "region": "Kansai",
        "stations": [
            {"name_en": "Shin-Osaka Station", "name_ja": "新大阪駅", "type": "shinkansen_hub"},
            {"name_en": "Osaka Station", "name_ja": "大阪駅", "type": "major"},
            {"name_en": "Namba Station", "name_ja": "難波駅", "type": "major"},
        ],
        "recommended_days": {"min": 1, "max": 3},
        "airport_connections": ["KIX", "ITM"],
    },
    {
        "id": "hiroshima",
        "name_en": "Hiroshima",
        "name_ja": "広島",
        "name_zh": "广岛",
        "region": "Chugoku",
        "stations": [
            {"name_en": "Hiroshima Station", "name_ja": "広島駅", "type": "shinkansen_hub"},
        ],
        "recommended_days": {"min": 1, "max": 2},
        "airport_connections": ["HIJ"],
    },
    {
        "id": "nara",
        "name_en": "Nara",
        "name_ja": "奈良",
        "name_zh": "奈良",
        "region": "Kansai",
        "stations": [
            {"name_en": "JR Nara Station", "name_ja": "JR奈良駅", "type": "major"},
            {"name_en": "Kintetsu Nara Station", "name_ja": "近鉄奈良駅", "type": "major"},
        ],
        "recommended_days": {"min": 1, "max": 1},
        "airport_connections": ["KIX"],
    },
    {
        "id": "hakone",
        "name_en": "Hakone",
        "name_ja": "箱根",
        "name_zh": "箱根",
        "region": "Kanto",
        "stations": [
            {"name_en": "Hakone-Yumoto Station", "name_ja": "箱根湯本駅", "type": "major"},
        ],
        "recommended_days": {"min": 1, "max": 2},
        "airport_connections": ["HND"],
    },
    {
        "id": "kamakura",
        "name_en": "Kamakura",
        "name_ja": "鎌倉",
        "name_zh": "镰仓",
        "region": "Kanto",
        "stations": [
            {"name_en": "Kamakura Station", "name_ja": "鎌倉駅", "type": "major"},
        ],
        "recommended_days": {"min": 1, "max": 1},
        "airport_connections": ["HND"],
    },
    {
        "id": "kanazawa",
        "name_en": "Kanazawa",
        "name_ja": "金沢",
        "name_zh": "金泽",
        "region": "Hokuriku",
        "stations": [
            {"name_en": "Kanazawa Station", "name_ja": "金沢駅", "type": "shinkansen_hub"},
        ],
        "recommended_days": {"min": 1, "max": 2},
        "airport_connections": ["KMQ"],
    },
    {
        "id": "fukuoka",
        "name_en": "Fukuoka",
        "name_ja": "福岡",
        "name_zh": "福冈",
        "region": "Kyushu",
        "stations": [
            {"name_en": "Hakata Station", "name_ja": "博多駅", "type": "shinkansen_hub"},
        ],
        "recommended_days": {"min": 1, "max": 2},
        "airport_connections": ["FUK"],
    },
    {
        "id": "nagoya",
        "name_en": "Nagoya",
        "name_ja": "名古屋",
        "name_zh": "名古屋",
        "region": "Chubu",
        "stations": [
            {"name_en": "Nagoya Station", "name_ja": "名古屋駅", "type": "shinkansen_hub"},
        ],
        "recommended_days": {"min": 1, "max": 2},
        "airport_connections": ["NGO"],
    },
    {
        "id": "sapporo",
        "name_en": "Sapporo",
        "name_ja": "札幌",
        "name_zh": "札幌",
        "region": "Hokkaido",
        "stations": [
            {"name_en": "Sapporo Station", "name_ja": "札幌駅", "type": "major"},
        ],
        "recommended_days": {"min": 2, "max": 3},
        "airport_connections": ["CTS"],
    },
    {
        "id": "sendai",
        "name_en": "Sendai",
        "name_ja": "仙台",
        "name_zh": "仙台",
        "region": "Tohoku",
        "stations": [
            {"name_en": "Sendai Station", "name_ja": "仙台駅", "type": "shinkansen_hub"},
        ],
        "recommended_days": {"min": 1, "max": 2},
        "airport_connections": ["SDJ"],
    },
    {
        "id": "nikko",
        "name_en": "Nikko",
        "name_ja": "日光",
        "name_zh": "日光",
        "region": "Kanto",
        "stations": [
            {"name_en": "Tobu Nikko Station", "name_ja": "東武日光駅", "type": "major"},
            {"name_en": "JR Nikko Station", "name_ja": "JR日光駅", "type": "major"},
        ],
        "recommended_days": {"min": 1, "max": 1},
        "airport_connections": ["NRT"],
    },
    {
        "id": "takayama",
        "name_en": "Takayama",
        "name_ja": "高山",
        "name_zh": "高山",
        "region": "Chubu",
        "stations": [
            {"name_en": "Takayama Station", "name_ja": "高山駅", "type": "major"},
        ],
        "recommended_days": {"min": 1, "max": 2},
        "airport_connections": ["NGO"],
    },
    {
        "id": "kobe",
        "name_en": "Kobe",
        "name_ja": "神戸",
        "name_zh": "神户",
        "region": "Kansai",
        "stations": [
            {"name_en": "Shin-Kobe Station", "name_ja": "新神戸駅", "type": "shinkansen_hub"},
            {"name_en": "Sannomiya Station", "name_ja": "三ノ宮駅", "type": "major"},
        ],
        "recommended_days": {"min": 1, "max": 1},
        "airport_connections": ["KIX", "ITM"],
    },
]


def get_city_details(city_id: str) -> dict | None:
    for city in CITIES:
        if city["id"] == city_id:
            return city
    return None
