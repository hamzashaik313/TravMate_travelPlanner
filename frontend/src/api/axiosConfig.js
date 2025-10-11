import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: "http://localhost:8080",
});

// Helper for Authorization header
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// Fetch all trips
export const fetchTrips = () => {
  return API.get("/api/trips", { headers: getAuthHeaders() });
};

// Fetch single trip by ID
export const fetchTripById = (id) => {
  return API.get(`/api/user/trips/${id}`, { headers: getAuthHeaders() });
};

// Add new trip
export const addTrip = (tripData) => {
  return API.post("/api/trips", tripData, { headers: getAuthHeaders() });
};

// Export default Axios instance if needed
export default API;
