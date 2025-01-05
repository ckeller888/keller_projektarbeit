import { useState, useEffect } from "react";
import axios from "axios";
import { Titelleiste } from "./Titelleiste";
import { Tabelle } from "./Tabelle";

function App() {
  const [formattedData, setFormattedData] = useState([]);
  const [standortnameOptions, setStandortnameOptions] = useState([]);
  const [standortname, setStandortname] = useState("");
  const [datum, setDatum] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/data")
      .then((response) => {
        const data = response.data;

  
        const formatTimestamp = (timestamp) => {
          const date = new Date(timestamp);
          return date.toISOString().split("T")[0];
        };

        const formatted = data.map((item) => ({
          ...item,
          Datum: formatTimestamp(item.Datum),
        }));

        setFormattedData(formatted);

        const getUniqueOptions = (array, key) => {
          return Array.from(new Set(array.map((item) => item[key]))).sort();
        };

        setStandortnameOptions(getUniqueOptions(formatted, "Standortname"));
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Daten:", error);
      });
  }, []);

  const handleStandortnameChange = (event) => setStandortname(event.target.value);
  const handleDatumChange = (newValue) => {
    if (newValue) {
      const updatedDate = new Date(newValue);
      updatedDate.setFullYear(2023);
      setDatum(updatedDate); 
    }
  };

  const resetStandortname = () => setStandortname("");
  const resetDatum = () => setDatum("");

 
  const filteredData = formattedData.filter((e) => {
    const itemDate = new Date(e.Datum);
    return (
      (standortname ? e["Standortname"] === standortname : true) &&
      (datum ? itemDate.getFullYear() === 2023 && itemDate.getMonth() === datum.getMonth() && itemDate.getDate() === datum.getDate() : true)
    );
  });

  return (
    <div className="App">
      <div>
        <Titelleiste
          standortnameLabel="Wählen Sie einen Standort"
          standortnameOptions={standortnameOptions}
          standortnameValue={standortname}
          datumValue={datum}
          incrementStandortname={handleStandortnameChange}
          incrementDatum={handleDatumChange}
          incrementResetStandortname={resetStandortname}
          incrementResetDatum={resetDatum}
        />
      </div>
      <div>
        <Tabelle data={filteredData} />
      </div>
    </div>
  );
}

export default App;