"use client"
import { Code } from "@/components/editor/editor/code";
import { Socket } from "socket.io-client";
import { useSocket } from "@/hooks/use-sockets";
import { Editor } from "@/components/editor/editor";
import { TerminalComponent } from "@/components/terminal";
import { useEffect, useState } from "react";
import { Directory, File, RemoteFile, Type } from "@/components/editor/utils/file-manager";

export default function CodePage({ params }: { params: { replId: string } }) {
    const socket = useSocket();
    const [files, setFiles] = useState<RemoteFile[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

    useEffect(() => {
        socket.emit("requestDir", "", (content: any) => {
            setFiles(content);
        });
    }, []);

    const handleFileSelect = (file: File | Directory | undefined) => {
        if (!file?.path) return;

        if (file?.type === Type.DIRECTORY) {
            socket.emit("requestDir", `${file.path}`, (content: any) => {
                setFiles(prevFiles => [...prevFiles, ...content]);
            });
        } else {
            socket.emit("requestFile", `${file?.path}`, (content: any) => {
                file.content = content;
                setSelectedFile(file);
            });
        }
    }

    return (
        <div className="flex m-2">
            <div style={{ width: "60%", height: "600px", textAlign: "left" }}>
                <Editor selectedFile={selectedFile} files={files} onSelect={handleFileSelect} socket={socket} />
            </div>
            <div style={{ width: "40%", height: "600px", textAlign: "left" }}>
                <TerminalComponent socket={socket} />
            </div>
        </div>
    );
}