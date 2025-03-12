"use client"
import { Code } from "@/components/editor/editor/code";
import { Socket } from "socket.io-client";
import { useSocket } from "@/hooks/use-sockets";
import { Editor } from "@/components/editor/editor";
import { TerminalComponent } from "@/components/terminal";
import { useEffect, useState } from "react";
import { Directory, File, RemoteFile, Type } from "@/components/editor/utils/file-manager";
import { Button } from "@/components/ui/button";
import { Output } from "@/components/output";

export default function CodePage({ params }: { params: { replId: string } }) {
    const socket = useSocket();
    const [files, setFiles] = useState<RemoteFile[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
    const [showOutput, setShowOutput] = useState<boolean>(false);

    useEffect(() => {
        if (socket) {
            socket.emit("requestDir", "", (content: any) => {
                setFiles(content);
            });
        }
    }, [socket]);

    const handleFileSelect = (file: File | Directory | undefined) => {
        if (!file?.path) return;

        if (file?.type === Type.DIRECTORY) {
            socket?.emit("requestDir", `${file.path}`, (content: any) => {
                setFiles(prevFiles => [...prevFiles, ...content]);
            });
        } else {
            socket?.emit("requestFile", `${file?.path}`, (content: any) => {
                file.content = content;
                setSelectedFile(file);
            });
        }
    }

    return (
        socket && <>
            <div className="flex justify-end">
                <Button className="p-2 m-2 bg-blue-500 text-white" onClick={() => setShowOutput(!showOutput)}>See output</Button>
            </div>
            <div className="flex m-2">
                <div className="h-screen w-3/5">
                    <Editor selectedFile={selectedFile} files={files} onSelect={handleFileSelect} socket={socket} />
                </div>
                <div className="flex flex-col w-2/5">
                    {showOutput && <div className="">
                        <Output />
                    </div>}
                    <TerminalComponent socket={socket} />
                </div>
            </div>
        </>
    );
}