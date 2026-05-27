import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function GET(req: NextRequest) {
  try {
    if (!BACKEND_API_URL) {
      return NextResponse.json(
        { message: "BACKEND_API_URL is not configured" },
        { status: 500 },
      );
    }

    const cookie = req.headers.get("cookie") ?? "";

    const backendRes = await fetch(`${BACKEND_API_URL}/authentication/me`, {
      method: "GET",
      headers: {
        Cookie: cookie,
      },
      cache: "no-store",
    });

    const data = await backendRes.json().catch(() => null);

    return NextResponse.json(data, {
      status: backendRes.status,
    });
  } catch (error) {
    console.error("Auth me proxy error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
