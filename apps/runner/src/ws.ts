import { Server, Socket } from "socket.io";
import http from "node:http";
import { TerminalManager } from "./pty";

const terminalManager = new TerminalManager();
export function createWsServer(httpServer: http.Server, options: any) {
    const io = new Server(httpServer, options);

    io.on("connection", (socket) => {
        const host = socket.handshake.headers.host;
        const replId = host?.split(":")[0];
        console.log(replId);

        if (!replId) {
            socket.disconnect();
            terminalManager.clearPty(socket.id);
            return;
        }

        initHandler(socket, replId);
    });
}

function initHandler(socket: Socket, replId: string) {
    socket.on("requestTerminal", () => {
        const terminal = terminalManager.createPty(socket.id, replId, (data) => {
            socket.emit("terminal", Buffer.from(data, "utf-8"));
        });
    });

    socket.on("terminalData", (data) => {
        terminalManager.writeToPty(socket.id, data);
    });
}