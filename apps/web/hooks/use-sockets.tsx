import { io } from "socket.io-client";

export function useSocket() {
    const socket = io("http://localhost:3000");
    return socket;
}