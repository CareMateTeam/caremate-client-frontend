// src/app/api/auth/line-login/route.ts
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type LineVerifyResponse = {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  name?: string;
  picture?: string;
  email?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { message: "idToken is required" },
        { status: 400 },
      );
    }

    const params = new URLSearchParams();
    params.append("id_token", idToken);
    params.append("client_id", process.env.LINE_CHANNEL_ID!);

    const lineRes = await fetch("https://api.line.me/oauth2/v2.1/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!lineRes.ok) {
      const errorText = await lineRes.text();

      console.error("LINE verify failed:", {
        status: lineRes.status,
        body: errorText,
      });

      return NextResponse.json(
        {
          message: "Invalid LINE idToken",
          detail: errorText,
        },
        { status: 401 },
      );
    }

    const lineUser = (await lineRes.json()) as LineVerifyResponse;

    const user = {
      lineUserId: lineUser.sub,
      name: lineUser.name ?? null,
      picture: lineUser.picture ?? null,
      email: lineUser.email ?? null,
    };

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    const token = await new SignJWT(user)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    const cookieStore = await cookies();

    cookieStore.set("caremate_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      message: "Login success",
      user,
    });
  } catch (error) {
    console.error("LINE login error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
