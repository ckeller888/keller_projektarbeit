import { renderToString } from "react-dom/server";
import { CssBaseline, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import Params from "./Params";
import { BASE_LAYERS } from "./BaseLayer";

const outerBounds = [
  [47.335589, 8.421493],
  [47.431759, 8.64684],
];

const BASE_URL = "/api";

const pointToLayer = (feature, latlng) => {
  const { T: temp } = feature.properties;

  let color;
  if (temp >= 25) {
    color = "red";
  } else if (temp <= 10) {
    color = "blue";
  } else {
    color = "orange";
  }
  return L.circleMarker(latlng, {
    radius: 10,
    color: color,
    fillOpacity: 0.6,
  });
};

const onEachFeature = (feature, layer) => {
  const { Standortname, T, RainDur, p } = feature.properties;

  const popupContent = (
    <Popup
      Standortname={Standortname}
      T={T}
      RainDur={RainDur}
      p={p}
    />
  );

  layer.bindPopup(renderToString(popupContent));
};

function Popup({ Standortname, T, RainDur, p }) {
  return (
    <>
      <Typography variant="h3">{Standortname}</Typography>
      <p>
        <strong>Temperatur:</strong> {T}°C<br />
        <strong>Niederschlag:</strong> {RainDur} mm<br />
        <strong>Luftdruck:</strong> {p} hPa
      </p>
    </>
  );
}

function Map() {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [geoJsonKey, setGeoJsonKey] = useState(null);
  const [filters, setFilters] = useState({
    date: new Date("2023-01-01"),
    temp: null,
    rain: null,
    pressure: null,
  });

  const fetchFilteredData = async () => {
  const formattedDate = filters.date.toISOString().split("T")[0];
  
  const params = new URLSearchParams({
    date: formattedDate,
  });
  
  if (filters.temp !== null) params.append("temp", filters.temp);
  if (filters.rain !== null) params.append("rain", filters.rain);
  if (filters.pressure !== null) params.append("pressure", filters.pressure);

  const url = `${BASE_URL}/data/filter?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data from ${url}`);
    }
    const result = await response.json();
    const geoJsonFormatted = {
      type: "FeatureCollection",
      features: result.map((entry) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [entry.WGS84_lng, entry.WGS84_lat],
        },
        properties: entry,
      })),
    };
    setGeoJsonData(geoJsonFormatted);
    setGeoJsonKey(Date.now());
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


  useEffect(() => {
    fetchFilteredData();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <CssBaseline />
      <Params filters={filters} onFilterChange={handleFilterChange} />
      <MapContainer
        style={{ height: "100vh" }}
        center={[0, 0]}
        zoom={12}
        minZoom={12}
        maxBounds={outerBounds}
        maxBoundsViscosity={1}
      >
        <LayersControl position="topright">
          {BASE_LAYERS.map((baseLayer) => (
            <LayersControl.BaseLayer
              key={baseLayer.url}
              checked={baseLayer.checked}
              name={baseLayer.name}
            >
              <TileLayer attribution={baseLayer.attribution} url={baseLayer.url} />
            </LayersControl.BaseLayer>
          ))}
          <LayersControl.Overlay checked name="Meteodaten">
            {geoJsonData && (
              <GeoJSON
                key={geoJsonKey}
                data={geoJsonData}
                pointToLayer={pointToLayer}
                onEachFeature={onEachFeature}
              />
            )}
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </>
  );
}

export default Map;
