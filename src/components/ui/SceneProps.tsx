import { useAppStore } from "@/store";

export function SceneProps() {
  const { sceneProps, setSceneProps } = useAppStore();

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Scene props:</h2>
      <div className="mb-2 flex items-center gap-2">
        <input
          type="checkbox"
          checked={sceneProps.showGrid}
          onChange={(e) => setSceneProps({ showGrid: e.target.checked })}
        />
        <label htmlFor="showGrid" className="cursor-pointer">
          Show Grid
        </label>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <input
          type="checkbox"
          checked={sceneProps.showHelpers}
          onChange={(e) => setSceneProps({ showHelpers: e.target.checked })}
        />
        <label htmlFor="showHelpers" className="cursor-pointer">
          Show Helpers
        </label>
      </div>

      <div className="mb-2 flex items-center gap-2">
        <input
          type="checkbox"
          id="autoUpdate"
          checked={sceneProps.autoUpdate}
          onChange={(e) => setSceneProps({ autoUpdate: e.target.checked })}
        />
        <label htmlFor="autoUpdate" className="cursor-pointer">
          Auto Update
        </label>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          id="showInfoPanel"
          checked={sceneProps.showInfoPanel}
          onChange={(e) => setSceneProps({ showInfoPanel: e.target.checked })}
        />
        <label htmlFor="showInfoPanel" className="cursor-pointer">
          Show Info Panel
        </label>
      </div>
    </div>
  );
}
