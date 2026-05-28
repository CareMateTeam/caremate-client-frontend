import {
  buildAuthHeaders,
  getBackendUrl,
  safeJson,
} from "@/libs/api-header/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RouteParams = Promise<{
  relativeId: string;
}>;

export async function GET(
  _request: NextRequest,
  { params }: { params: RouteParams },
) {
  try {
    const { relativeId } = await params;

    if (!relativeId) {
      return NextResponse.json(
        {
          message: "relativeId is required",
        },
        {
          status: 400,
        },
      );
    }

    const authHeaders = await buildAuthHeaders();

    const res = await fetch(getBackendUrl(`/user-relatives/${relativeId}`), {
      method: "GET",
      headers: authHeaders,
      cache: "no-store",
    });

    const data = await safeJson(res);

    return NextResponse.json(data, {
      status: res.status,
    });
  } catch (error) {
    console.error("GET /api/relative/[relativeId] error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch relative",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: RouteParams },
) {
  try {
    const { relativeId } = await params;

    if (!relativeId) {
      return NextResponse.json(
        {
          message: "relativeId is required",
        },
        {
          status: 400,
        },
      );
    }

    const body = await request.json();

    const authHeaders = await buildAuthHeaders();

    const res = await fetch(getBackendUrl(`/user-relatives/${relativeId}`), {
      method: "PATCH",
      headers : authHeaders, 
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await safeJson(res);

    return NextResponse.json(data, {
      status: res.status,
    });
  } catch (error) {
    console.error("PATCH /api/relative/[relativeId] error:", error);

    return NextResponse.json(
      {
        message: "Failed to update relative",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: RouteParams },
) {
  try {
    const { relativeId } = await params;

    if (!relativeId) {
      return NextResponse.json(
        {
          message: "relativeId is required",
        },
        {
          status: 400,
        },
      );
    }

    const authHeaders = await buildAuthHeaders();

    const res = await fetch(getBackendUrl(`/user-relatives/${relativeId}`), {
      method: "DELETE",
      headers: authHeaders,
      cache: "no-store",
    });

    const data = await safeJson(res);

    return NextResponse.json(data, {
      status: res.status,
    });
  } catch (error) {
    console.error("DELETE /api/relative/[relativeId] error:", error);

    return NextResponse.json(
      {
        message: "Failed to delete relative",
      },
      {
        status: 500,
      },
    );
  }
}