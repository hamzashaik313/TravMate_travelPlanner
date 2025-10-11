import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate for routing
import API from "../api/axiosConfig";

import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });

      if (res.status === 200 && res.data?.token) {
        localStorage.setItem("token", res.data.token); // save JWT
        alert("Login successful!");
        navigate("/dashboard"); // redirect to dashboard
      } else {
        alert("Login failed! Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card sx={{ width: 400, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Travmate Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Login
            </Button>
            <Button
              fullWidth
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => navigate("/register")}
            >
              Go to Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
