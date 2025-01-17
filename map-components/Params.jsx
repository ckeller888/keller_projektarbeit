import { Box, Stack, Typography} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Legend from "./Legend";

export default function Params({ filters, onFilterChange }) {
  const handleDateChange = (newDate) => {
    onFilterChange("date", newDate);
  };

  return (
    <Stack direction="row" spacing={2} sx={{ padding: 2 }}>
      <Box sx={{ p: 1 }}>
        <Typography variant="subtitle2">Datumsauswahl</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={filters.date}
            onChange={handleDateChange}
            views={["month", "day"]}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>

      <Box sx={{ width: 250, p: 2 }}>
          <Legend />
      </Box>
    </Stack>
  );
}
