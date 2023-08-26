import axios from "axios";

export const api = axios.create({
  // baseURL: 'http://localhost:3333'
  // Colocar o link do backend
  baseURL: 'http://localhost:3333'
});