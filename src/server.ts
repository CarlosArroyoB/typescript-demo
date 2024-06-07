import express from "express";
import router from "./routes";

const server = express();

server.use(express.json());
server.use(router); // Esto significa que cualquier ruta definida en router estará disponible en la aplicación principal.

// module.exports = server;
export default server;
