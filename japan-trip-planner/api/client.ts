import axios from "axios"

export const apiClient = axios.create({
  baseURL: "",
  headers: { "Content-Type": "application/json" },
  timeout: 180_000, // 3 minutes — Kimi API can be slow for large itineraries
})
