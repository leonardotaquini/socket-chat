import express from "express";
import http from "http";
import chatModule from "./modules/chat/index.js";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(cors());

//Carga el modulo de chat y otros modulos de ser necesarios
chatModule(server);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
