import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleCheckBig } from "lucide-react";

export default function SuccessAlert({ message }) {
  return (
    <Alert variant="default">
      <CircleCheckBig className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
