import React from "react";
import { Box, Stack, Typography } from "@mui/material";

function Legend() {
  return (
    <Box sx={{ width: "270px", p: 2, border: "1px solid #ccc", borderRadius: 2, background: "#fff" }}>
      <Typography variant="h8">
        Legende
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box sx={{ width: 20, height: 20, background: "red", borderRadius: "50%" }} />
        <Typography>Temperatur ≥ 25°C</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box sx={{ width: 20, height: 20, background: "orange", borderRadius: "50%" }} />
        <Typography>Temperatur &gt;  10°C & &lt; 25°C</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box sx={{ width: 20, height: 20, background: "blue", borderRadius: "50%" }} />
        <Typography>Temperatur ≤ 10°C</Typography>
      </Stack>
    </Box>
  );
}

export default Legend;