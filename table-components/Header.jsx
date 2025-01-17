import { Box, AppBar, Toolbar, TextField, Button } from "@mui/material";
import { Dropdown } from "./Dropdown";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

export const Titelleiste = ({
  standortnameLabel,
  standortnameOptions,
  standortnameValue,
  incrementStandortname,
  incrementDatum,
  incrementResetStandortname,
  incrementResetDatum,
}) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
  <Box display="flex" alignItems="center" gap={2}>
    <AppBar
      position="static"
      style={{ backgroundColor: "white" }}
    >
      <Toolbar>
      <h2 style={{color: 'black'  }}>Tabelle Meteodaten</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "auto" }}>
          <Dropdown
            label={standortnameLabel}
            options={standortnameOptions}
            value={standortnameValue}
            increment={incrementStandortname}
            onClick={incrementResetStandortname}
          />
      
          <DatePicker
            label="Datumsauswahl"
            onChange={incrementDatum}
            renderInput={(params) => <TextField {...params} />}
            views={["month", "day"]}
          />

          <Button
            onClick={incrementResetDatum}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            Alle Daten
          </Button>

        </div>
      </Toolbar>
    </AppBar>
  </Box>
  </LocalizationProvider>
);
