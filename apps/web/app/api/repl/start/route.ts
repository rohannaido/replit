import { NextRequest, NextResponse } from "next/server";
import { deploy } from "@/lib/deployment";
import { copyS3Folder } from "@/lib/file";

export async function POST(request: NextRequest) {
    const { replId } = await request.json();

    // copy repl files to S3
    await copyS3Folder(`base/react`, `code/${replId}`)
    // create repl
    const success = await deploy(replId);
    if (!success) {
        return NextResponse.json({ error: "Failed to deploy" }, { status: 500 });
    }

    return NextResponse.json({ replId });
}
