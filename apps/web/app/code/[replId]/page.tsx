"use client"
import { Code } from "@/components/editor/editor/code";
import { Socket } from "socket.io-client";
import { useSocket } from "@/hooks/use-sockets";
import { Editor } from "@/components/editor/editor";

export default function CodePage({ params }: { params: { replId: string } }) {
    const socket = useSocket();
    return <div>
        <Editor selectedFile={undefined} files={[]} onSelect={() => { }} socket={socket} />
    </div>;
}