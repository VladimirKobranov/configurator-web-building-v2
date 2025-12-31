import { useAppStore } from "@/store";

export function SceneProps() {
  const { sceneProps, setSceneProps, autoUpdate, setAutoUpdate } =
    useAppStore();

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

      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          id="autoUpdate"
          checked={autoUpdate}
          onChange={(e) => setAutoUpdate(e.target.checked)}
        />
        <label htmlFor="autoUpdate" className="cursor-pointer">
          Auto Update
        </label>
      </div>
    </div>
  );
}
