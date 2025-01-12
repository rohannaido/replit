import { createServer } from "node:http";
import express from "express";
import { createWsServer } from "./ws";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const httpServer = createServer(app);
createWsServer(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

app.use(cors());

httpServer.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
