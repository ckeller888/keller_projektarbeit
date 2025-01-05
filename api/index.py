from pathlib import Path
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import json
from datetime import datetime

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

DATA_FILE = Path("api/meteodaten_2023_daily.json") 
if not DATA_FILE.exists():
    raise FileNotFoundError(f"Die Datei {DATA_FILE} wurde nicht gefunden.")

with open(DATA_FILE, "r", encoding="utf-8") as file:
    data = json.load(file)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/data")
async def get_data():
    return data

# @app.get("/api/data/filter")
# async def filter_data(standort: str = None, datum: str = None):
#     try:
#         filtered_data = data

#         if standort:
#             filtered_data = [
#                 item for item in filtered_data if item["Standortname"] == standort
#             ]

#         if datum:
#             filtered_data = [
#                 item for item in filtered_data if item["Datum"] == datum
#             ]

#         return filtered_data
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @app.get("/specs/{spec_name}")
# async def get_daily_data(spec_name: str):
#     file_path = VEGA_SPECS_DIR / f"{spec_name}.csv"
#     if not file_path.exists():
#         raise HTTPException(
#             status_code=404, detail=f"Spec file '{spec_name}' not found"
#         try:
#             return FileResponse(file_path)
#         except Exception as e:
#             raise HTTPException(status_code=500, detail=str(e))
# )
    
# @app.get("/specs")
# async def list_specs():

#     spec_files = [f.stem for f in VEGA_SPECS_DIR.iterdir()]
#     return {"specs": spec_files}

# @app.get("/api/data/filter")
# async def filter_data(datum: str):
#     filtered_data = data
#     if datum:
#         timestamp = int(datetime.strptime(datum, "%Y-%m-%d").timestamp() * 1000)
#         filtered_data = [
#             item for item in filtered_data if item["Datum"] == timestamp
#         ]
    
#     return JSONResponse(content={"type": "FeatureCollection", "features": filtered_data})


if __name__ == "__main__":
    uvicorn.run(app, port=8000)
