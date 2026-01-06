export function HotkeysOverlay() {
  const hotkeys = [
    { key: "G", label: "Grid" },
    { key: "H", label: "Helpers" },
    { key: "R", label: "Randomize" },
  ];

  return (
    <div className="fixed bottom-6 right-6 text-white pointer-events-none flex flex-col items-end">
      <div className="text-[11px] uppercase text-gray-400 mb-2 font-bold tracking-wider">
        Hotkeys:
      </div>
      <div className="flex flex-col gap-2">
        {hotkeys.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-3 justify-end">
            <span className="text-[11px] text-gray-400">{label}</span>
            <span className="w-5 h-5 bg-[#222] border border-[#444] rounded flex items-center justify-center text-[10px] font-bold">
              {key}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
