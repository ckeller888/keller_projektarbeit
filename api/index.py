from pathlib import Path
import uvicorn
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import json
from datetime import datetime

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

DATA_FILE = Path("api/meteodaten_2023_daily.json")
if not DATA_FILE.exists():
    raise FileNotFoundError(f"Die Datei {DATA_FILE} wurde nicht gefunden.")

with open(DATA_FILE, "r", encoding="utf-8") as file:
    data = json.load(file)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/data")
async def get_data():
    return data

@app.get("/api/data/filter")
async def filter_data(
    date: str = Query(None, description="Datum im Format YYYY-MM-DD"),
    temp: float = Query(None, description="Temperatur"),
    rain: float = Query(None, description="Niederschlagsdauer"),
    pressure: float = Query(None, description="Luftdruck"),
):
    filtered_data = []

    for entry in data:
        entry_date = datetime.fromtimestamp(entry["Datum"] / 1000).strftime("%Y-%m-%d")
        matches_date = date is None or entry_date == date
        matches_temp = temp is None or entry["T"] == temp
        matches_rain = rain is None or entry["RainDur"] == rain
        matches_pressure = pressure is None or entry["p"] == pressure

        if matches_date and matches_temp and matches_rain and matches_pressure:
            filtered_data.append(entry)

    return filtered_data


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
