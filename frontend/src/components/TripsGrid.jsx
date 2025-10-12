// src/components/TripsGrid.jsx
import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Chip,
} from "@mui/material";

export default function TripsGrid({ trips = [] }) {
  // Example trips fallback if none passed
  const sample = trips.length
    ? trips
    : [
        { id: 1, title: "Goa weekend", days: 3, img: null, status: "Saved" },
        {
          id: 2,
          title: "Himachal roadtrip",
          days: 6,
          img: null,
          status: "Published",
        },
        { id: 3, title: "Rann of Kutch", days: 4, img: null, status: "Draft" },
      ];

  return (
    <Grid container spacing={3}>
      {sample.map((t) => (
        <Grid item xs={12} sm={6} md={4} key={t.id}>
          <Card>
            <Box
              sx={{
                height: 160,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                overflow: "hidden",
                background: "#EEF2FF",
              }}
            >
              {/* Place trip image here */}
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                  {t.title}
                </Typography>
              </Box>
            </Box>

            <CardContent>
              <Typography variant="h6">{t.title}</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {t.days} days · {t.status}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Open</Button>
              <Button size="small">Edit</Button>
              <Chip label={t.status} size="small" sx={{ ml: "auto" }} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
