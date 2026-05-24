"use client";

import { useEffect, useState } from "react";
import {
  getLiffIdToken,
  initLiff,
  isLiffLoggedIn,
  loginWithLiff,
} from "@/libs/liff";

export default function LiffAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handleLogin = async () => {
      await initLiff();

      if (!isLiffLoggedIn()) {
        loginWithLiff();
        return;
      }

      const idToken = getLiffIdToken();

      if (!idToken) {
        throw new Error("LINE ID token not found");
      }

      const res = await fetch("/api/auth/line-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      setReady(true);
    };

    handleLogin().catch(console.error);
  }, []);

  if (!ready) return <div>Loading...</div>;

  return <>{children}</>;
}
