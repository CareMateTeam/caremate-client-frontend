import { headers } from "next/headers";


const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function buildAuthHeaders() {
  const requestHeaders = await headers();

  const cookie = requestHeaders.get("cookie");
  const authorization = requestHeaders.get("authorization");

  const backendHeaders: HeadersInit = {
    Accept: "application/json",
  };

  if (cookie) {
    backendHeaders.Cookie = cookie;
  }

  if (authorization) {
    backendHeaders.Authorization = authorization;
  }

  return backendHeaders;
}

export async function safeJson(res: Response) {
  const text = await res.text();

  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return {
      message: text,
    };
  }
}

export function getBackendUrl(path: string) {
  if (!BACKEND_API_URL) {
    throw new Error("BACKEND_API_URL is not configured");
  }

  return `${BACKEND_API_URL}${path}`;
}
