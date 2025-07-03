"use client";
import { Button } from "@/components/ui/button";
import { Loader2, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BackButton({ text, variant, size }) {
  // Back button uses the useRouter hook to navigate back to the previous page.
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  function handleGoBack() {
    setDisabled(true);
    router.back();
  }

  return (
    <Button
      variant={variant || "outline"}
      size={size || "sm"}
      disabled={disabled}
      onClick={handleGoBack}
    >
      {disabled ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Undo2 className="h-4 w-4" />
      )}
      <span>{text || "Return"}</span>
    </Button>
  );
}
