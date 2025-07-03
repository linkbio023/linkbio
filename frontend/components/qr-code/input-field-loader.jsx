import { Loader2 } from "lucide-react";

export default function InputFieldLoader() {
  return (
    <div className="flex justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}
