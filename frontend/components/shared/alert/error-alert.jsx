import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function ErrorAlert({ title, message }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title || "Error"}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
