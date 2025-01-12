import { Server } from "socket.io";
import http from "node:http";

export function createWsServer(httpServer: http.Server) {
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("a user connected");
    });
}