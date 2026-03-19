SHINKANSEN_ROUTES = [
    # Tokaido Shinkansen
    {
        "from": "tokyo", "to": "kyoto",
        "line": "Tokaido Shinkansen",
        "trains": {
            "nozomi": {"duration_min": 135, "fare_yen": 13970, "jr_pass": False},
            "hikari": {"duration_min": 160, "fare_yen": 13970, "jr_pass": True},
        },
    },
    {
        "from": "tokyo", "to": "osaka",
        "line": "Tokaido Shinkansen",
        "trains": {
            "nozomi": {"duration_min": 150, "fare_yen": 14720, "jr_pass": False},
            "hikari": {"duration_min": 180, "fare_yen": 14720, "jr_pass": True},
        },
    },
    {
        "from": "tokyo", "to": "nagoya",
        "line": "Tokaido Shinkansen",
        "trains": {
            "nozomi": {"duration_min": 100, "fare_yen": 11300, "jr_pass": False},
            "hikari": {"duration_min": 110, "fare_yen": 11300, "jr_pass": True},
        },
    },
    {
        "from": "kyoto", "to": "osaka",
        "line": "Tokaido Shinkansen",
        "trains": {
            "nozomi": {"duration_min": 15, "fare_yen": 3080, "jr_pass": False},
            "hikari": {"duration_min": 15, "fare_yen": 3080, "jr_pass": True},
        },
    },
    # Sanyo Shinkansen
    {
        "from": "osaka", "to": "hiroshima",
        "line": "Sanyo Shinkansen",
        "trains": {
            "nozomi": {"duration_min": 95, "fare_yen": 10580, "jr_pass": False},
            "sakura": {"duration_min": 105, "fare_yen": 10580, "jr_pass": True},
        },
    },
    {
        "from": "kyoto", "to": "hiroshima",
        "line": "Tokaido-Sanyo Shinkansen",
        "trains": {
            "nozomi": {"duration_min": 110, "fare_yen": 11610, "jr_pass": False},
            "hikari": {"duration_min": 130, "fare_yen": 11610, "jr_pass": True},
        },
    },
    {
        "from": "osaka", "to": "fukuoka",
        "line": "Sanyo Shinkansen",
        "trains": {
            "nozomi": {"duration_min": 150, "fare_yen": 15600, "jr_pass": False},
            "sakura": {"duration_min": 165, "fare_yen": 15600, "jr_pass": True},
        },
    },
    # Tohoku Shinkansen
    {
        "from": "tokyo", "to": "sendai",
        "line": "Tohoku Shinkansen",
        "trains": {
            "hayabusa": {"duration_min": 96, "fare_yen": 11410, "jr_pass": True},
            "yamabiko": {"duration_min": 120, "fare_yen": 10890, "jr_pass": True},
        },
    },
    # Hokuriku Shinkansen
    {
        "from": "tokyo", "to": "kanazawa",
        "line": "Hokuriku Shinkansen",
        "trains": {
            "kagayaki": {"duration_min": 150, "fare_yen": 14380, "jr_pass": True},
            "hakutaka": {"duration_min": 180, "fare_yen": 14380, "jr_pass": True},
        },
    },
    # Short routes
    {
        "from": "kyoto", "to": "nara",
        "line": "JR Nara Line",
        "trains": {
            "miyakoji_rapid": {"duration_min": 45, "fare_yen": 720, "jr_pass": True},
        },
    },
    {
        "from": "tokyo", "to": "kamakura",
        "line": "JR Yokosuka Line",
        "trains": {
            "yokosuka_line": {"duration_min": 55, "fare_yen": 940, "jr_pass": True},
        },
    },
    {
        "from": "tokyo", "to": "hakone",
        "line": "Tokaido Shinkansen + Hakone Tozan",
        "trains": {
            "kodama_to_odawara": {"duration_min": 35, "fare_yen": 3280, "jr_pass": True},
        },
    },
    {
        "from": "tokyo", "to": "nikko",
        "line": "Tohoku Shinkansen + JR Nikko Line",
        "trains": {
            "yamabiko_to_utsunomiya": {"duration_min": 100, "fare_yen": 5500, "jr_pass": True},
        },
    },
    {
        "from": "nagoya", "to": "takayama",
        "line": "JR Takayama Line (Hida Limited Express)",
        "trains": {
            "hida": {"duration_min": 140, "fare_yen": 6380, "jr_pass": True},
        },
    },
    {
        "from": "osaka", "to": "kobe",
        "line": "JR Kobe Line",
        "trains": {
            "special_rapid": {"duration_min": 21, "fare_yen": 410, "jr_pass": True},
        },
    },
]


def find_route(from_city: str, to_city: str) -> dict | None:
    for route in SHINKANSEN_ROUTES:
        if (route["from"] == from_city and route["to"] == to_city) or \
           (route["from"] == to_city and route["to"] == from_city):
            return route
    return None
