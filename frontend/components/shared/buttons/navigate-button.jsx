"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function NavigateButton({ icon, text, path, ...props }) {
  // NavigateButton component is a button that navigates to a specific path when clicked.
  const [loading, setLoading] = useState(false);

  function handleClick() {
    if (path) {
      setLoading(true);
    }
  }

  return (
    <Link href={path}>
      <Button title={text} onClick={handleClick} disabled={loading} {...props}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
        <span>{text}</span>
        <span className="sr-only">{text}</span>
      </Button>
    </Link>
  );
}
