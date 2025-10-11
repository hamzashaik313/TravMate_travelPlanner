import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddTrip from "./components/AddTrip";

import TripDetails from "./components/TripDetails";

// ✅ new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-trip" element={<AddTrip />} />
        <Route path="/trip/:id" element={<TripDetails />} />{" "}
        <Route path="/trip/:id" element={<TripDetails />} />
        {/* ✅ new route */}
      </Routes>
    </Router>
  );
}

export default App;
