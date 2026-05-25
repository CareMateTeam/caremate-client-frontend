"use client";

import { useEffect, useState } from "react";

console.log("TOP LEVEL:", typeof window);

export default function ClientTest() {
  const [message, setMessage] = useState("Starting...");

  useEffect(() => {
    console.log("USE EFFECT RUN IN BROWSER");
    setMessage("Hydrated");
  }, []);

  return (
    <div>
      <p>{message}</p>
      <button onClick={() => setMessage("Button clicked")}>
        Test Button
      </button>
    </div>
  );
}