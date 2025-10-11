import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTripById } from "../api/axiosConfig";
import API from "../api/axiosConfig";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [editTripData, setEditTripData] = useState(null);

  // Fetch trip details
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await fetchTripById(id);
        setTrip(res.data);
      } catch (err) {
        console.error("Error fetching trip:", err);
        alert("Failed to load trip details");
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  // Edit trip handler
  const handleEditTrip = async () => {
    try {
      await API.put(`/api/trips/${trip.id}`, {
        ...editTripData,
        budget: parseFloat(editTripData.budget),
      });
      setTrip(editTripData); // update local state
      setOpenEdit(false);
    } catch (err) {
      console.error("Error editing trip:", err);
      alert("Failed to edit trip");
    }
  };

  // Delete trip handler
  const handleDeleteTrip = async () => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    try {
      await API.delete(`/api/trips/${trip.id}`);
      alert("Trip deleted successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error deleting trip:", err);
      alert("Failed to delete trip");
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 10, ml: "50%" }} />;
  if (!trip) return <Typography align="center">Trip not found</Typography>;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ bgcolor: "#f5f7fa" }}
    >
      <Card sx={{ width: 400, p: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom>
            {trip.title}
          </Typography>
          <Typography>🌍 Destination: {trip.destination}</Typography>
          <Typography>
            📅 {trip.startDate} → {trip.endDate}
          </Typography>
          <Typography>💰 Budget: ₹{trip.budget}</Typography>

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setEditTripData(trip);
                setOpenEdit(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteTrip}
            >
              Delete
            </Button>
            <Button variant="outlined" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Edit Trip Dialog */}
      {editTripData && (
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
          <DialogTitle>Edit Trip</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Trip Title"
              fullWidth
              value={editTripData.title}
              onChange={(e) =>
                setEditTripData({ ...editTripData, title: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Destination"
              fullWidth
              value={editTripData.destination}
              onChange={(e) =>
                setEditTripData({
                  ...editTripData,
                  destination: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={editTripData.startDate}
              onChange={(e) =>
                setEditTripData({ ...editTripData, startDate: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={editTripData.endDate}
              onChange={(e) =>
                setEditTripData({ ...editTripData, endDate: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Budget (₹)"
              type="number"
              fullWidth
              value={editTripData.budget}
              onChange={(e) =>
                setEditTripData({ ...editTripData, budget: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleEditTrip}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
