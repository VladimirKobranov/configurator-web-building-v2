import { useAppStore } from "@/store";

export function CameraProps() {
  const { camProps, setCamProps, autoRotateSpeed, setAutoRotateSpeed } =
    useAppStore();

  const fmt = (v: number[]) => v.map((n) => n.toFixed(1)).join(", ");

  return (
    <div className="border-b border-[#333]">
      <div className="ui-section-title">Camera props</div>
      <div className="flex flex-col py-1">
        <div className="ui-row">
          <span className="ui-label text-[11px]">position:</span>
          <span className="ui-value text-[11px]">
            [{fmt(camProps.position)}]
          </span>
        </div>
        <div className="ui-row">
          <span className="ui-label text-[11px]">rotation:</span>
          <span className="ui-value text-[11px]">
            [{fmt(camProps.rotation)}]
          </span>
        </div>
        <div className="ui-row">
          <span className="ui-label text-[11px]">target:</span>
          <span className="ui-value text-[11px]">[{fmt(camProps.target)}]</span>
        </div>
      </div>

      <div className="px-3 pb-3 pt-2 border-b border-[#333]/50">
        <div className="flex items-center gap-2 mb-2">
          <span className="ui-label text-[11px] whitespace-nowrap">FOV:</span>
          <span className="bg-[#222] border border-[#444] px-1 min-w-[30px] text-center text-[10px] ml-auto">
            {camProps.fov.toFixed(1)}
          </span>
        </div>
        <input
          type="range"
          min={20}
          max={120}
          step={1}
          value={camProps.fov}
          onChange={(e) => setCamProps({ fov: +e.target.value })}
          className="w-full h-1"
        />
      </div>

      <div className="px-3 pb-3 pt-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="ui-label text-[11px] whitespace-nowrap">
            Auto Rotate Speed:
          </span>
          <span className="bg-[#222] border border-[#444] px-1 min-w-[30px] text-center text-[10px] ml-auto">
            {autoRotateSpeed}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={5}
          step={0.1}
          value={autoRotateSpeed}
          onChange={(e) => setAutoRotateSpeed(+e.target.value)}
          className="w-full h-1"
        />
      </div>
    </div>
  );
}
