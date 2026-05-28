import {
  buildAuthHeaders,
  getBackendUrl,
  safeJson,
} from "@/libs/api-header/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function GET(req: NextRequest) {
  try {
    if (!BACKEND_API_URL) {
      return NextResponse.json(
        { message: "BACKEND_API_URL is not configured" },
        { status: 500 },
      );
    }

    const authHeaders = await buildAuthHeaders();

    const backendRes = await fetch(
      getBackendUrl("/users/health-information"),
      {
        method: "GET",
        headers: authHeaders,
        cache: "no-store",
      },
    );

    const data = await safeJson(backendRes);

    return NextResponse.json(data, {
      status: backendRes.status,
    });
  } catch (error) {
    console.error("GET /api/user/health-information error:", error);

    return NextResponse.json(
      { message: "Failed to fetch health information" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    if (!BACKEND_API_URL) {
      return NextResponse.json(
        { message: "BACKEND_API_URL is not configured" },
        { status: 500 },
      );
    }

    const authHeaders = await buildAuthHeaders();
    const body = await req.json();

    const backendRes = await fetch(
      getBackendUrl(`/users/health-information`),
      {
        method: "PATCH",
        headers: authHeaders,
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    const data = await safeJson(backendRes);

    return NextResponse.json(data, {
      status: backendRes.status,
    });
  } catch (error) {
    console.error("PATCH /api/user/health-information error:", error);

    return NextResponse.json(
      { message: "Failed to update health information" },
      { status: 500 },
    );
  }
}
