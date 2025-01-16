"use client"
import { useEffect, useRef } from "react"
import { Socket } from "socket.io-client";
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
const fitAddon = new FitAddon();
import '@xterm/xterm/css/xterm.css'

function ab2str(buf: ArrayBuffer) {
    return String.fromCharCode.apply(null, Array.from(new Uint8Array(buf)));
}

const OPTIONS_TERM = {
    useStyle: true,
    screenKeys: true,
    cursorBlink: true,
    cols: 200,
    theme: {
        background: "black"
    }
};
export const TerminalComponent = ({ socket }: { socket: Socket }) => {
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!terminalRef || !terminalRef.current || !socket) {
            return;
        }

        const term = new Terminal(OPTIONS_TERM)
        term.loadAddon(fitAddon);
        term.open(terminalRef.current);
        fitAddon.fit();

        socket.emit("requestTerminal");
        socket.on("terminal", terminalHandler);

        function terminalHandler(data: ArrayBuffer) {
            if (data instanceof ArrayBuffer) {
                term.write(ab2str(data))
            }
        }

        term.onData((data) => {
            socket.emit("terminalData", data)
        });

        return () => {
            socket.off("terminal")
        }
    }, [terminalRef]);

    return <div className="h-2/4" ref={terminalRef}></div>
}