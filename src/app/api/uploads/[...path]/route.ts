import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params;
    const filePath = path.join(UPLOAD_DIR, ...pathSegments);

    // Security: ensure the path is within UPLOAD_DIR
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(UPLOAD_DIR)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!existsSync(resolvedPath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const ext = path.extname(resolvedPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    const fileBuffer = await readFile(resolvedPath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving file:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

