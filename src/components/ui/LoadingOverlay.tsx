export function LoadingOverlay({
  message = "Initializing scene",
}: {
  message?: string;
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="border bg-card px-5 py-4 text-center shadow-sm">
        <span className="text-xs font-medium">{message}</span>
        <div className="mt-1 text-[10px] text-muted-foreground">
          Please wait
        </div>
      </div>
    </div>
  );
}
