import { useAppStore } from "@/store";

export function SceneProps() {
  const { sceneProps, setSceneProps } = useAppStore();

  return (
    <div className="pb-4">
      <div className="ui-section-title">Scene props</div>

      <div className="flex flex-col gap-0">
        <div className="ui-row">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showGrid"
              checked={sceneProps.showGrid}
              onChange={(e) => setSceneProps({ showGrid: e.target.checked })}
            />
            <label
              htmlFor="showGrid"
              className="ui-label text-[12px] cursor-pointer"
            >
              Show Grid
            </label>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-4 h-4 bg-[#222] border border-[#444] rounded flex items-center justify-center text-[9px] font-bold">
              G
            </span>
          </div>
        </div>

        <div className="ui-row">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showHelpers"
              checked={sceneProps.showHelpers}
              onChange={(e) => setSceneProps({ showHelpers: e.target.checked })}
            />
            <label
              htmlFor="showHelpers"
              className="ui-label text-[12px] cursor-pointer"
            >
              Show Helpers
            </label>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-4 h-4 bg-[#222] border border-[#444] rounded flex items-center justify-center text-[9px] font-bold">
              H
            </span>
          </div>
        </div>

        <div className="ui-row">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="autoUpdate"
              checked={sceneProps.autoUpdate}
              onChange={(e) => setSceneProps({ autoUpdate: e.target.checked })}
            />
            <label
              htmlFor="autoUpdate"
              className="ui-label text-[12px] cursor-pointer"
            >
              Auto Updates
            </label>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-4 h-4 bg-[#222] border border-[#444] rounded flex items-center justify-center text-[9px] font-bold">
              R
            </span>
          </div>
        </div>

        <div className="ui-row">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showInfoPanel"
              checked={sceneProps.showInfoPanel}
              onChange={(e) =>
                setSceneProps({ showInfoPanel: e.target.checked })
              }
            />
            <label
              htmlFor="showInfoPanel"
              className="ui-label text-[12px] cursor-pointer"
            >
              Show Info Panel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
