"use client"
import { Code } from "@/components/editor/editor/code";
import { Socket } from "socket.io-client";
import { useSocket } from "@/hooks/use-sockets";
import { Editor } from "@/components/editor/editor";
import { TerminalComponent } from "@/components/terminal";

export default function CodePage({ params }: { params: { replId: string } }) {
    const socket = useSocket();
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "60%", height: "400px", textAlign: "left" }}>
                <Editor selectedFile={undefined} files={[]} onSelect={() => { }} socket={socket} />
            </div>
            <div style={{ width: "40%", height: "400px", textAlign: "left" }}>
                <TerminalComponent socket={socket} />
            </div>
        </div>
    );
}