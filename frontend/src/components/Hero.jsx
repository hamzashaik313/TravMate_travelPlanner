// src/components/Hero.jsx
import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 3,
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 8 },
        background: "linear-gradient(135deg, #6C5CE7 0%, #00B894 100%)",
        color: "white",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
          Travel Smarter with TravMate
        </Typography>
        <Typography sx={{ maxWidth: 500, mb: 4, opacity: 0.9 }}>
          Build your dream trip itinerary, track expenses, and explore hidden
          gems — all in one modern travel planner.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "primary.main",
              fontWeight: 600,
              "&:hover": { bgcolor: "#f3f3f3" },
            }}
          >
            Start Planning
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "white",
              color: "white",
              fontWeight: 600,
              "&:hover": {
                borderColor: "#fff",
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Explore Trips
          </Button>
        </Stack>
      </motion.div>

      {/* Decorative blobs */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          background: "rgba(255,255,255,0.15)",
          borderRadius: "50%",
          filter: "blur(80px)",
        }}
      />
    </Box>
  );
}
