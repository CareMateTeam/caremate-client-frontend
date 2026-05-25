"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getLiffIdToken,
  initLiff,
  isLiffLoggedIn,
  loginWithLiff,
} from "@/libs/liff";

export default function LiffAuthProvider() {
  const router = useRouter();
  const [message, setMessage] = useState("Starting...");
    useEffect(() => {
    console.log("USE EFFECT RUN");
    setMessage("useEffect works");
  }, []);
  useEffect(() => {
    const handleLogin = async () => {
      setMessage("Before initLiff");

      await initLiff();

      setMessage("After initLiff");

      if (!isLiffLoggedIn()) {
        setMessage("Redirecting to LINE login...");
        loginWithLiff();
        return;
      }

      setMessage("Getting idToken...");

      const idToken = getLiffIdToken();

      if (!idToken) {
        throw new Error("LINE ID token not found");
      }

      setMessage("Calling login API...");

      const res = await fetch("/api/auth/line-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message ?? "Login failed");
      }

      setMessage("Login success, redirecting to home...");

      router.replace("/home");
    };

    handleLogin().catch((err) => {
      console.error("LIFF auth error:", err);
      setMessage(`Auth error: ${err.message}`);
    });
  }, [router]);

  return (
    <div>
      <p>{message}</p>
      <button className="px-4 bg-red-500 text-white rounded-md cursor-pointer" onClick={() => setMessage("Client JS works")}>Test Client</button>
    </div>
  );
}
