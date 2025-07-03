"use client";
import ErrorContent from "@/components/shared/error-content";
import { useEffect } from "react";

export default function PageError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <ErrorContent reset={reset} />;
}
