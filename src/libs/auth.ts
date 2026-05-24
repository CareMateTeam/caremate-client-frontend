import { jwtVerify } from "jose";

export type SessionUser = {
  lineUserId: string;
  name: string | null;
  picture: string | null;
  email: string | null;
};

export async function verifySession(token: string): Promise<SessionUser | null> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);

    return {
      lineUserId: String(payload.lineUserId),
      name: payload.name ? String(payload.name) : null,
      picture: payload.picture ? String(payload.picture) : null,
      email: payload.email ? String(payload.email) : null,
    };
  } catch {
    return null;
  }
}