// src/components/Header.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: "transparent", py: 2 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 2,
              background: "linear-gradient(135deg,#6C5CE7,#00B894)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
            }}
          >
            TM
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            TravMate
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button variant="text">Explore</Button>
          <Button variant="text">My Trips</Button>
          <Button variant="contained" sx={{ bgcolor: "primary.main" }}>
            Create Trip
          </Button>
          <Button
            variant="text"
            sx={{
              color: "text.primary",
              fontWeight: 500,
              "&:hover": {
                color: "primary.main",
                transform: "scale(1.05)",
                transition: "all 0.2s ease-in-out",
              },
            }}
          >
            Explore
          </Button>

          <IconButton sx={{ ml: 1 }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
