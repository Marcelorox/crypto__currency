import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.coincap.io/v2",
  headers: { Authorization: "bearer " + import.meta.env.VITE_COINCAP_TOKEN },
  timeout: 3000,
});