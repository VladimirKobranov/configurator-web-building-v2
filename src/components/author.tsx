export default function Author() {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/20 pointer-events-none select-none font-medium">
      <span>Vlad Kobranov</span>
      <span className="h-3 w-[1px] bg-white/10" />
      <span className="opacity-60">Version 1.0.0</span>
    </div>
  );
}
