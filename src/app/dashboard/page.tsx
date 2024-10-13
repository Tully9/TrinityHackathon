"use client";
import { useEffect } from "react";

export default function DashboardRoute() {
  useEffect(() => {
    window.location.href = "http://127.0.0.1:5000";
  }, []);

  return null; // No UI is rendered since the redirect happens
}
