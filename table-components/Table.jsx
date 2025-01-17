import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export const Tabelle = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell id="TableHeader">Datum</TableCell>
            <TableCell id="TableHeader">Standortname</TableCell>
            <TableCell id="TableHeader">Temperatur [°C]</TableCell>
            <TableCell id="TableHeader">Niederschlagsdauer [min]</TableCell>
            <TableCell id="TableHeader">Luftdruck [hPa]</TableCell>
          </TableRow>
        </TableHead>
        <TableBody id="TableBody">
          {data.map((zeile) => (
            <TableRow>
              <TableCell className="TableWrapper">{zeile.Datum}</TableCell>
              <TableCell className="TableWrapper">
                {zeile.Standortname}
              </TableCell>
              <TableCell className="TableWrapper">{zeile.T}</TableCell>
              <TableCell className="TableWrapper">{zeile.RainDur}</TableCell>
              <TableCell className="TableWrapper">{zeile.p}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
