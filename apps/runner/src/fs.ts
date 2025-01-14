import fs from "fs/promises";

export async function fetchDir(dirPath: string, dir: string) {
    const files = await fs.readdir(dirPath);
    const stats = await Promise.all(files.map((file) => fs.stat(`${dirPath}/${file}`)));
    return files.map((file, index) => ({
        name: file,
        type: stats[index].isDirectory() ? "dir" : "file",
        path: `${dir}/${file}`,
    }));
}

export async function fetchFileContent(filePath: string) {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
}