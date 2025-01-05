import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
// import "./App2.module.css";

export const Dropdown = ({ label, options, value, increment, onClick }) => {
  return (
    <Box sx={{ minWidth: 300, display: "flex" }} alignItems="center" gap={2}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={increment}>
          {options.map((option) => (
            <MenuItem value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button id="ResetButton" variant="contained" onClick={onClick}>
        Reset
      </Button>
    </Box>
  );
};
