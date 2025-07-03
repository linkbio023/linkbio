import { Loader2 } from "lucide-react";

export default function PageLaoding() {
  return (
    <div className="flex items-center justify-center h-svh">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    </div>
  );
}
