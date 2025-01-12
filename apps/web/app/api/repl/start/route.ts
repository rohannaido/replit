import { NextRequest, NextResponse } from "next/server";
import { deploy } from "@/lib/deployment";

export async function POST(request: NextRequest) {
    const { replId } = await request.json();

    // create repl
    // const success = await deploy(replId);
    // if (!success) {
    //     return NextResponse.json({ error: "Failed to deploy" }, { status: 500 });
    // }

    return NextResponse.json({ replId });
}
