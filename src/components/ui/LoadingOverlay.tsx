export function LoadingOverlay({
  message = "Initializing scene",
}: {
  message?: string;
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none animate-fade-in">
      <div className="ui-panel px-8 py-6 flex flex-col items-center gap-4 min-w-[200px] shadow-2xl">
        <div className="flex gap-1.5 items-center justify-center h-8">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce-dot [animation-delay:-0.32s]"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce-dot [animation-delay:-0.16s]"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce-dot"></div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-[12px] font-bold uppercase tracking-wider text-gray-300">
            {message}
          </span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest animate-pulse">
            Please wait
          </span>
        </div>
      </div>
    </div>
  );
}
