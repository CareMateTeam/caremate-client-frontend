// src/app/api/auth/register-with-line/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function POST(req: NextRequest) {
  try {
    if (!BACKEND_API_URL) {
      return NextResponse.json(
        { message: "BACKEND_API_URL is not configured" },
        { status: 500 },
      );
    }

    const body = await req.json();

    const backendRes = await fetch(
      `${BACKEND_API_URL}/authentication/register-with-line`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    const data = await backendRes.json().catch(() => null);

    const res = NextResponse.json(data, {
      status: backendRes.status,
    });

    const setCookie = backendRes.headers.get("set-cookie");

    if (setCookie) {
      res.headers.set("set-cookie", setCookie);
    }

    return res;
  } catch (error) {
    console.error("Register with LINE proxy error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
