// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8080/api/trips", // backend trips endpoint
// });

// // Fetch all trips
// export const fetchTrips = () => API.get("/");

// // Fetch trip by id
// export const fetchTripById = (id) => API.get(`/${id}`);

// // Add trip
// export const addTrip = (trip) => {
//   const token = localStorage.getItem("token");
//   return API.post("/", trip, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// // Update trip
// export const updateTrip = (id, trip) => {
//   const token = localStorage.getItem("token");
//   return API.put(`/${id}`, trip, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// // Delete trip
// export const deleteTrip = (id) => {
//   const token = localStorage.getItem("token");
//   return API.delete(`/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// export default API;
