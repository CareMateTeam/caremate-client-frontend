import {
  buildAuthHeaders,
  getBackendUrl,
  safeJson,
} from "@/libs/api-header/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";


export async function GET() {
  try {
    const authHeaders = await buildAuthHeaders();

    const res = await fetch(getBackendUrl("/user-relatives/"), {
      method: "GET",
      headers: authHeaders,
      cache: "no-store",
    });

    const data = await safeJson(res);

    return NextResponse.json(data, {
      status: res.status,
    });
  } catch (error) {
    console.error("GET /api/relative error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch relatives",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const authHeaders = await buildAuthHeaders();

    const res = await fetch(getBackendUrl("/user-relatives/"), {
      method: "POST",
      headers : authHeaders,
      body: JSON.stringify(body),
      cache: "no-store",
    });

    console.log("Create member response:", body);

    const data = await safeJson(res);

    return NextResponse.json(data, {
      status: res.status,
    });
  } catch (error) {
    console.error("POST /api/relative error:", error);

    return NextResponse.json(
      {
        message: "Failed to create relative",
      },
      {
        status: 500,
      },
    );
  }
}