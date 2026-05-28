import {
  buildAuthHeaders,
  getBackendUrl,
  safeJson,
} from "@/libs/api-header/headers";
import {  NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function GET() {
  try {
    if (!BACKEND_API_URL) {
      return NextResponse.json(
        { message: "BACKEND_API_URL is not configured" },
        { status: 500 },
      );
    }
    const res = await fetch(getBackendUrl("/care/services"), {
      method: "GET",
      cache: "no-store",
    });

    const data = await safeJson(res);

    return NextResponse.json(data, {
      status: res.status,
    });
  } catch (error) {
    console.error("GET care/services error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch care services",
      },
      {
        status: 500,
      },
    );
  }
}