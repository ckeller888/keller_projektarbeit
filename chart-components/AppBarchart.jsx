import { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; 
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { VegaLite } from "react-vega";
import { de } from "date-fns/locale";


export function App() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date(2023, 0, 1));
  const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    axios
      .get("/api/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Daten:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const filtered = data.filter((item) => {
        const itemDate = new Date(item.Datum);
        return (
          itemDate.getMonth() === selectedDate.getMonth() &&
          itemDate.getDate() === selectedDate.getDate() &&
          itemDate.getFullYear() === 2023 
        );
      });
      setFilteredData(filtered);
    }
  }, [selectedDate, data]);

  const handleDateChange = (newDate) => {
    if (newDate) {
      newDate.setFullYear(2023);
      setSelectedDate(newDate);
    }
  };

  const TemperaturPlot = (filteredData) => {
    const spec = {
      mark: "bar",
      encoding: {
        x: { field: "Standortname", title: "" , type: "nominal" },
        y: { field: "T", title: "Temperatur (°C)",type: "quantitative" },
        color: {
            field: "Standortname",
            type: "nominal",
            legend: {
              title: "Standorte",
              orient: "right",
            },
        },
      },
      data: { values: filteredData },
    };
    return spec;
  };

  const LuftdruckPlot = (filteredData) => {
    const spec = {
      mark: "bar",
      encoding: {
        x: { field: "Standortname", title: "",type: "nominal" },
        y: { field: "p", title: "Luftdruck (hPa)", type: "quantitative" },
        color: {
          field: "Standortname",
          type: "nominal",
          legend: {
            title: "Standorte",
            orient: "right",
          },
        },
      },
      data: { values: filteredData },
    };
    return spec;
  };

  const NiederschlagsdauerPlot = (filteredData) => {
    const spec = {
      mark: "bar",
      encoding: {
        x: { field: "Standortname", title: "" ,type: "nominal"},
        y: {
          field: "RainDur",
          title: "Niederschlagsdauer [min]",
          type: "quantitative"
          
        },
        color: {
          field: "Standortname",
          type: "nominal",
          legend: {
            title: "Standorte",
            orient: "right",
          },
        },
      },
      data: { values: filteredData },
    };
    return spec;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={de}>
      <Box sx={{ padding: 0 }}>
        <h2>Balkendiagramme für den ausgewählten Tag und Monat (Jahr 2023)</h2>

        <DatePicker
          label="Wählen Sie ein Datum"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
          views={["month", "day"]}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          <Box sx={{ flex: 1, marginRight: 2 }}>
            <h4>Temperatur</h4>
            <VegaLite spec={TemperaturPlot(filteredData)} />
          </Box>

          <Box sx={{ flex: 1, marginRight: 2 }}>
            <h4>Luftdruck</h4>
            <VegaLite spec={LuftdruckPlot(filteredData)} />
          </Box>

          <Box sx={{ flex: 1 }}>
            <h4>Niederschlagsdauer</h4>
            <VegaLite spec={NiederschlagsdauerPlot(filteredData)} />
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default App;
