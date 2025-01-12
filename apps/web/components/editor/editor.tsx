import { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/editor/components/sidebar";
import { Code } from "@/components/editor/editor/code";
import { File, buildFileTree, RemoteFile } from "@/components/editor/utils/file-manager";
import { FileTree } from "@/components/editor/components/file-tree";
import { Socket } from "socket.io-client";

// credits - https://codesandbox.io/s/monaco-tree-pec7u
export const Editor = ({
    files,
    onSelect,
    selectedFile,
    socket
}: {
    files: RemoteFile[];
    onSelect: (file: File) => void;
    selectedFile: File | undefined;
    socket: Socket;
}) => {
    const rootDir = useMemo(() => {
        return buildFileTree(files);
    }, [files]);

    useEffect(() => {
        if (!selectedFile) {
            onSelect(rootDir.files[0] as File)
        }
    }, [selectedFile])

    return (
        <div className="flex">
            <div className="flex-1">
                <Sidebar>
                    <FileTree
                        rootDir={rootDir}
                        selectedFile={selectedFile}
                        onSelect={onSelect}
                    />
                </Sidebar>
                <Code socket={socket} selectedFile={selectedFile} />
            </div>
        </div>
    );
};