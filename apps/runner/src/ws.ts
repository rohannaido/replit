import { Server } from "socket.io";
import http from "node:http";

export function createWsServer(httpServer: http.Server, options: any) {
    const io = new Server(httpServer, options);

    io.on("connection", (socket) => {
        console.log("a user connected");
    });
}