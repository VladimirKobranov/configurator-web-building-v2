export function HotkeysOverlay() {
  return (
    <div className="fixed bottom-6 left-6 text-white pointer-events-none">
      <div className="text-[11px] uppercase text-gray-400 mb-2 font-bold tracking-wider">
        Hotkeys:
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 bg-[#222] border border-[#444] rounded flex items-center justify-center text-[10px] font-bold">
            G
          </span>
          <span className="text-[12px] text-gray-300">Grid</span>
          <span className="w-5 h-5 bg-[#222] border border-[#444] rounded flex items-center justify-center text-[10px] font-bold ml-2">
            H
          </span>
          <span className="text-[12px] text-gray-300">Helpers</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 bg-[#222] border border-[#444] rounded flex items-center justify-center text-[10px] font-bold">
            R
          </span>
          <span className="text-[12px] text-gray-300">Randomize</span>
        </div>
      </div>
    </div>
  );
}
