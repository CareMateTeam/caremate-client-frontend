import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifySession } from "@/libs/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("caremate_session")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = await verifySession(token);

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}
