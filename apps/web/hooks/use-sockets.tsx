import { io, Socket } from "socket.io-client";
import { useState, useEffect } from "react";

export function useSocket() {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(`http://k8s-default-a124.ap-southeast-2.elb.amazonaws.com/`);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return socket;
}
