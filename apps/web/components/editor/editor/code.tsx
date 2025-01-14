import Editor from "@monaco-editor/react";
import { File } from "../utils/file-manager";
import { Socket } from "socket.io-client";

export const Code = ({ selectedFile, socket }: { selectedFile: File | undefined, socket: Socket }) => {
  if (!selectedFile)
    return null

  console.log("MEMO > selectedFile");
  console.log(selectedFile);

  console.log("MEMO > code content");
  console.log(selectedFile.content);

  const code = selectedFile.content
  let language = selectedFile.name.split('.').pop()

  if (language === "js" || language === "jsx")
    language = "javascript";
  else if (language === "ts" || language === "tsx")
    language = "typescript"
  else if (language === "py")
    language = "python"

  function debounce(func: (value: string | undefined) => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return (value: string | undefined) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(value);
      }, wait);
    };
  }

  console.log("MEMO > before editor");
  console.log(code);
  console.log(language);

  return (
    <>
      {/* <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" /> */}
      <Editor
        height="100vh"
        language={language}
        value={code}
        theme="vs-dark"
        onChange={debounce((value) => {
          // Should send diffs, for now sending the whole file
          // PR and win a bounty!
          if (value) {
            // socket.emit("updateContent", { path: selectedFile.path, content: value });
          }
        }, 500)}
      />
    </>
  )
}
