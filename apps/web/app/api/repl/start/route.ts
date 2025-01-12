import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { replId } = await request.json();

    // create repl

    return NextResponse.json({ replId });
}
