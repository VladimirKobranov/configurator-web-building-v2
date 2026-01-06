import { useAppStore } from "@/store";

export function InfoPanel() {
  const { selectedItem, setSelectedItem } = useAppStore();

  if (!selectedItem) return null;

  return (
    <div className="z-100 text-white fixed top-6 right-6 w-80 ui-panel pointer-events-auto">
      <div className="ui-section-title">Element Info</div>

      <div className="flex flex-col py-1 border-b border-[#333]/50">
        <div className="ui-row">
          <span className="ui-label text-[11px]">Type:</span>
          <span className="ui-value text-[11px]">{selectedItem.type}</span>
        </div>
        <div className="ui-row">
          <span className="ui-label text-[11px]">Instance ID:</span>
          <span className="ui-value text-[11px]">
            {selectedItem.instanceId}
          </span>
        </div>
        <div className="ui-row">
          <span className="ui-label text-[11px]">Position:</span>
          <span className="ui-value text-[11px]">
            [{selectedItem.item.position.x.toFixed(2)},{" "}
            {selectedItem.item.position.y.toFixed(2)},{" "}
            {selectedItem.item.position.z.toFixed(2)}]
          </span>
        </div>
        {selectedItem.item.rotationY !== undefined && (
          <div className="ui-row">
            <span className="ui-label text-[11px]">Rotation Y:</span>
            <span className="ui-value text-[11px]">
              {selectedItem.item.rotationY.toFixed(2)}
            </span>
          </div>
        )}
        {selectedItem.item.sideIndex !== undefined && (
          <div className="ui-row">
            <span className="ui-label text-[11px]">Side Index:</span>
            <span className="ui-value text-[11px]">
              {selectedItem.item.sideIndex}
            </span>
          </div>
        )}
      </div>

      {selectedItem.geometryStats && (
        <div className="flex flex-col py-1 border-b border-[#333]/50">
          <div className="ui-row">
            <span className="ui-label text-[11px]">Triangles:</span>
            <span className="ui-value text-[11px]">
              {selectedItem.geometryStats.triangles}
            </span>
          </div>
          <div className="ui-row">
            <span className="ui-label text-[11px]">Vertices:</span>
            <span className="ui-value text-[11px]">
              {selectedItem.geometryStats.vertices}
            </span>
          </div>
        </div>
      )}

      <div className="px-3 py-3">
        <button
          className="w-full bg-transparent hover:bg-[#222] border border-[#333] text-[11px] font-bold py-1.5 uppercase transition-colors text-gray-400 hover:text-white"
          onClick={() => setSelectedItem(null)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
