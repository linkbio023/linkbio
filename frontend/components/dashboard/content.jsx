import { Loader2 } from "lucide-react";

function LoadingBody() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-32 w-full">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span>Loading...</span>
    </div>
  );
}

export default function Content({
  children,
  title,
  extra,
  isValidating,
  isLoading = false,
}) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-white">
      <div className="flex items-center justify-between gap-4 h-8">
        <h1 className="text-lg font-medium md:text-2xl">{title}</h1>
        <div className="flex flex-row gap-2 items-center">
          {isValidating && <Loader2 className="h-4 w-4 animate-spin" />}
          <div>{extra}</div>
        </div>
      </div>
      <div className="grid gap-8 p-2 lg:p-4 rounded-lg border-primary shadow-xs bg-primary/5">
        {isLoading ? <LoadingBody /> : children}
      </div>
    </main>
  );
}
