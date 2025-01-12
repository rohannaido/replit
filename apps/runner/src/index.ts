import { createServer } from "node:http";
import express from "express";
import { createWsServer } from "./ws";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const httpServer = createServer(app);
createWsServer(httpServer);

httpServer.listen(process.env.PORT || 3000);
