import { MenuIcon, IconButton, Typography, Toolbar, Box, AppBar } from "@mui/material"

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static" sx={{ bgcolor: "#000000" }}>
        <Toolbar variant="regular">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            USGS Earthquakes
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}