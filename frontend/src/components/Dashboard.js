import React, { useEffect, useState } from "react";
import { fetchTrips, addTrip } from "../api/axiosConfig";
import API from "../api/axiosConfig"; // for edit/delete
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [newTrip, setNewTrip] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
  });
  const navigate = useNavigate();

  const loadTrips = async () => {
    try {
      const res = await fetchTrips();
      setTrips(res.data);
    } catch (err) {
      console.error("Error fetching trips:", err);
      alert("Failed to load trips");
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleAddTrip = async () => {
    try {
      await addTrip({ ...newTrip, budget: parseFloat(newTrip.budget) });
      setOpenAdd(false);
      setNewTrip({
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
        budget: "",
      });
      loadTrips();
    } catch (err) {
      console.error("Error adding trip:", err);
      alert("Failed to add trip");
    }
  };

  const handleEditTrip = async () => {
    try {
      await API.put(`/api/trips/${currentTrip.id}`, {
        ...currentTrip,
        budget: parseFloat(currentTrip.budget),
      });
      setOpenEdit(false);
      setCurrentTrip(null);
      loadTrips();
    } catch (err) {
      console.error("Error editing trip:", err);
      alert("Failed to edit trip");
    }
  };

  const handleDeleteTrip = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    try {
      await API.delete(`/api/trips/${id}`);
      loadTrips();
    } catch (err) {
      console.error("Error deleting trip:", err);
      alert("Failed to delete trip");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Travmate Dashboard</Typography>
          <Box>
            <Button color="inherit" onClick={() => setOpenAdd(true)}>
              Add Trip
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box p={4}>
        {trips.length === 0 ? (
          <Typography align="center" color="text.secondary" mt={5}>
            No trips found. Click “Add Trip” to create one!
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {trips.map((trip) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={trip.id}>
                <Card
                  onClick={() => navigate(`/trip/${trip.id}`)}
                  sx={{
                    borderRadius: 3,
                    boxShadow: 4,
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.03)", cursor: "pointer" },
                    background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      {trip.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      🌍 {trip.destination}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      📅 {trip.startDate} → {trip.endDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      💰 ₹{trip.budget}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentTrip(trip);
                        setOpenEdit(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTrip(trip.id);
                      }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Add Trip Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Trip</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Trip Title"
            fullWidth
            value={newTrip.title}
            onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Destination"
            fullWidth
            value={newTrip.destination}
            onChange={(e) =>
              setNewTrip({ ...newTrip, destination: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newTrip.startDate}
            onChange={(e) =>
              setNewTrip({ ...newTrip, startDate: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="End Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newTrip.endDate}
            onChange={(e) =>
              setNewTrip({ ...newTrip, endDate: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Budget (₹)"
            type="number"
            fullWidth
            value={newTrip.budget}
            onChange={(e) => setNewTrip({ ...newTrip, budget: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddTrip}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Trip Dialog */}
      {currentTrip && (
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
          <DialogTitle>Edit Trip</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Trip Title"
              fullWidth
              value={currentTrip.title}
              onChange={(e) =>
                setCurrentTrip({ ...currentTrip, title: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Destination"
              fullWidth
              value={currentTrip.destination}
              onChange={(e) =>
                setCurrentTrip({ ...currentTrip, destination: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={currentTrip.startDate}
              onChange={(e) =>
                setCurrentTrip({ ...currentTrip, startDate: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={currentTrip.endDate}
              onChange={(e) =>
                setCurrentTrip({ ...currentTrip, endDate: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Budget (₹)"
              type="number"
              fullWidth
              value={currentTrip.budget}
              onChange={(e) =>
                setCurrentTrip({ ...currentTrip, budget: e.target.value })
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
