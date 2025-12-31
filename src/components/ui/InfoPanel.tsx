import { useAppStore } from "@/store";

export function InfoPanel() {
  const { selectedItem, setSelectedItem } = useAppStore();

  if (!selectedItem) return null;

  return (
    <div className="z-100 text-white fixed top-10 right-10">
      <div>
        <h2 className="text-lg font-bold">Element Info:</h2>
        <ul>
          <li>Type: {selectedItem.type}</li>
          <li>Instance ID: {selectedItem.instanceId}</li>
          <li>
            Position: [{selectedItem.item.position.x.toFixed(2)},{" "}
            {selectedItem.item.position.y.toFixed(2)},{" "}
            {selectedItem.item.position.z.toFixed(2)}]
          </li>
          {selectedItem.item.rotationY !== undefined && (
            <li>Rotation Y: {selectedItem.item.rotationY.toFixed(2)}</li>
          )}
          {selectedItem.item.sideIndex !== undefined && (
            <li>Side Index: {selectedItem.item.sideIndex}</li>
          )}
          {selectedItem.geometryStats && (
            <>
              <li>Triangles: {selectedItem.geometryStats.triangles}</li>
              <li>Vertices: {selectedItem.geometryStats.vertices}</li>
            </>
          )}
        </ul>
        <button
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded w-full"
          onClick={() => setSelectedItem(null)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
