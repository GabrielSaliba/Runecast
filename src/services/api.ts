import axios from "axios";

export const api = axios.create({
  baseURL: process.env.JSON_SERVER_URI || "http://localhost:3333",
});
