import type { ReactNode } from "react";
import { ChevronDown, RotateCcw, Shuffle, X } from "lucide-react";
import { buildingConfig, hotkeysConfig } from "@/config/config";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { version } from "../../package.json";

const hotkey = (label: string) =>
  hotkeysConfig.find((item) => item.label === label)?.key;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="editor-section" open>
      <summary>
        {title}
        <ChevronDown size={14} />
      </summary>
      <div className="editor-section-body">{children}</div>
    </details>
  );
}

function Control({
  label,
  value,
  min,
  max,
  step = 1,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  display?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="editor-control">
      <div className="editor-control-label">
        <span>{label}</span>
        <output>{display ?? value}</output>
      </div>
      <Slider
        aria-label={label}
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(values) =>
          onChange(typeof values === "number" ? values : values[0])
        }
      />
    </div>
  );
}

function Option({
  id,
  label,
  checked,
  shortcut,
  onChange,
  children,
}: {
  id: string;
  label: string;
  checked: boolean;
  shortcut?: string;
  onChange: (value: boolean) => void;
  children?: ReactNode;
}) {
  return (
    <div className="editor-toggle">
      <div className="editor-toggle-row">
        <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
        <label htmlFor={id}>{label}</label>
        {shortcut && (
          <kbd className="border px-1 text-[10px] text-muted-foreground">
            {shortcut}
          </kbd>
        )}
      </div>
      {checked && children && <div className="editor-nested">{children}</div>}
    </div>
  );
}

function ConfigurationPanel() {
  const {
    buildingProps,
    camProps,
    sceneProps,
    autoRotateSpeed,
    setBuildingProps,
    setCamProps,
    setSceneProps,
    setAutoRotateSpeed,
    randomizeSeed,
    resetBuildingProps,
    sendWorkerMessage,
  } = useAppStore();

  if (!buildingProps) return null;

  return (
    <Card
      className="editor-panel gap-0 py-0"
      aria-label="Building configuration"
    >
      <CardHeader className="py-4">
        <div className="text-[10px] text-muted-foreground">
          SCENE EDITOR / 01
        </div>
        <CardTitle className="text-base">Building configuration</CardTitle>
      </CardHeader>

      <div className="editor-content">
        <Section title="Camera">
          <div className="editor-readout">
            <span>Position</span>
            <code>
              [{camProps.position.map((n) => n.toFixed(1)).join(", ")}]
            </code>
          </div>
          <div className="editor-readout">
            <span>Rotation</span>
            <code>
              [{camProps.rotation.map((n) => n.toFixed(1)).join(", ")}]
            </code>
          </div>
          <div className="editor-readout">
            <span>Target</span>
            <code>[{camProps.target.map((n) => n.toFixed(1)).join(", ")}]</code>
          </div>
          <Control
            label="Field of view"
            value={camProps.fov}
            min={20}
            max={120}
            display={camProps.fov.toFixed(0) + "°"}
            onChange={(fov) => setCamProps({ fov })}
          />
          <Control
            label="Auto rotate"
            value={autoRotateSpeed}
            min={0}
            max={5}
            step={0.1}
            display={autoRotateSpeed.toFixed(1)}
            onChange={setAutoRotateSpeed}
          />
        </Section>

        <Section title="Building">
          <Control
            label="Width"
            value={buildingProps.sizeX}
            min={buildingProps.sizeXMin}
            max={buildingProps.sizeXMax}
            onChange={(sizeX) => setBuildingProps({ sizeX })}
          />
          <Control
            label="Floors"
            value={buildingProps.sizeY}
            min={buildingProps.sizeYMin}
            max={buildingProps.sizeYMax}
            onChange={(sizeY) => setBuildingProps({ sizeY })}
          />
          <Control
            label="Depth"
            value={buildingProps.sizeZ}
            min={buildingProps.sizeZMin}
            max={buildingProps.sizeZMax}
            onChange={(sizeZ) => setBuildingProps({ sizeZ })}
          />
          <Control
            label="Offset"
            value={buildingProps.offset}
            min={0}
            max={1}
            step={0.1}
            display={buildingProps.offset.toFixed(1)}
            onChange={(offset) => setBuildingProps({ offset })}
          />
          <Separator />
          <Option
            id="stairs"
            label="Stairs"
            checked={buildingProps.stairs}
            onChange={(stairs) => setBuildingProps({ stairs })}
          >
            <Control
              label="Side"
              value={buildingProps.stairsSide}
              min={0}
              max={buildingProps.firewall ? 1 : 3}
              onChange={(stairsSide) => setBuildingProps({ stairsSide })}
            />
            <Control
              label="Position"
              value={buildingProps.stairsIndex}
              min={1}
              max={Math.max(
                1,
                (buildingProps.stairsSide < 2
                  ? buildingProps.sizeX
                  : buildingProps.sizeZ) - 2,
              )}
              onChange={(stairsIndex) => setBuildingProps({ stairsIndex })}
            />
          </Option>
          <Option
            id="firewall"
            label="Firewall"
            checked={buildingProps.firewall}
            onChange={(firewall) => setBuildingProps({ firewall })}
          />
          <Option
            id="aircond"
            label="AC units"
            checked={buildingProps.aircond}
            onChange={(aircond) => setBuildingProps({ aircond })}
          >
            <Control
              label="Density"
              value={buildingProps.aircondPercent}
              min={0}
              max={100}
              display={buildingProps.aircondPercent + "%"}
              onChange={(aircondPercent) =>
                setBuildingProps({ aircondPercent })
              }
            />
          </Option>
          <Option
            id="firstFloorAcc"
            label="First floor accents"
            checked={buildingProps.firstFloorAcc}
            onChange={(firstFloorAcc) => setBuildingProps({ firstFloorAcc })}
          >
            <Control
              label="Density"
              value={buildingProps.firstFloorAccPercent}
              min={0}
              max={100}
              display={buildingProps.firstFloorAccPercent + "%"}
              onChange={(firstFloorAccPercent) =>
                setBuildingProps({ firstFloorAccPercent })
              }
            />
          </Option>
          <Option
            id="roofAcc"
            label="Roof accents"
            checked={buildingProps.roofAcc}
            onChange={(roofAcc) => setBuildingProps({ roofAcc })}
          >
            <Control
              label="Density"
              value={buildingProps.roofAccPercent}
              min={0}
              max={100}
              display={buildingProps.roofAccPercent + "%"}
              onChange={(roofAccPercent) =>
                setBuildingProps({ roofAccPercent })
              }
            />
          </Option>
        </Section>

        <Section title="Viewport">
          <Option
            id="showGrid"
            label="Show grid"
            checked={sceneProps.showGrid}
            shortcut={hotkey("Show Grid")}
            onChange={(showGrid) => setSceneProps({ showGrid })}
          />
          <Option
            id="showHelpers"
            label="Show helpers"
            checked={sceneProps.showHelpers}
            shortcut={hotkey("Show Helpers")}
            onChange={(showHelpers) => setSceneProps({ showHelpers })}
          />
          <Option
            id="autoUpdate"
            label="Auto updates"
            checked={sceneProps.autoUpdate}
            shortcut={hotkey("Auto Updates")}
            onChange={(autoUpdate) => setSceneProps({ autoUpdate })}
          />
          <Option
            id="showInfoPanel"
            label="Info panel"
            checked={sceneProps.showInfoPanel}
            shortcut={hotkey("Show Info Panel")}
            onChange={(showInfoPanel) => setSceneProps({ showInfoPanel })}
          />
        </Section>
      </div>

      <footer className="editor-actions">
        <Label htmlFor="seed">Seed</Label>
        <Input
          id="seed"
          className="select-text"
          type="number"
          value={buildingProps.randomSeed}
          onChange={(event) =>
            setBuildingProps({ randomSeed: +event.target.value.slice(0, 5) })
          }
        />
        <Button
          disabled={sceneProps.autoUpdate}
          onClick={() => sendWorkerMessage(buildingProps)}
        >
          Build
        </Button>
        <div className="editor-actions-row">
          <Button variant="outline" onClick={randomizeSeed}>
            <Shuffle size={13} /> Randomize
            <kbd className="ml-auto border px-1 text-[10px] text-muted-foreground">
              {hotkey("Randomize")}
            </kbd>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              resetBuildingProps();
              sendWorkerMessage(buildingConfig);
            }}
          >
            <RotateCcw size={13} /> Reset
          </Button>
        </div>
      </footer>
    </Card>
  );
}

function SelectionPanel() {
  const { selectedItem, setSelectedItem } = useAppStore();
  if (!selectedItem) return null;
  return (
    <Card className="selection-panel gap-0 py-0">
      <CardHeader className="flex flex-row items-start justify-between border-b py-4">
        <div>
          <div className="text-[10px] text-muted-foreground">
            SELECTED ELEMENT
          </div>
          <CardTitle className="mt-1 capitalize">
            {selectedItem.type.replace(/_/g, " ")}
          </CardTitle>
        </div>
        <Button
          size="icon-xs"
          variant="ghost"
          aria-label="Close selected element"
          onClick={() => setSelectedItem(null)}
        >
          <X />
        </Button>
      </CardHeader>
      <CardContent className="grid gap-3 py-4">
        <div className="editor-readout">
          <span>Instance</span>
          <code>#{selectedItem.instanceId}</code>
        </div>
        <div className="editor-readout">
          <span>Position</span>
          <code>
            {Object.values(selectedItem.item.position)
              .map((n) => n.toFixed(1))
              .join(" / ")}
          </code>
        </div>
        {selectedItem.item.rotationY !== undefined && (
          <div className="editor-readout">
            <span>Rotation Y</span>
            <code>{selectedItem.item.rotationY.toFixed(2)}</code>
          </div>
        )}
        {selectedItem.item.sideIndex !== undefined && (
          <div className="editor-readout">
            <span>Side index</span>
            <code>{selectedItem.item.sideIndex}</code>
          </div>
        )}
        {selectedItem.geometryStats && (
          <>
            <Separator />
            <div className="editor-readout">
              <span>Triangles</span>
              <code>
                {selectedItem.geometryStats.triangles.toLocaleString()}
              </code>
            </div>
            <div className="editor-readout">
              <span>Vertices</span>
              <code>
                {selectedItem.geometryStats.vertices.toLocaleString()}
              </code>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function Ui() {
  return (
    <>
      <ConfigurationPanel />
      <SelectionPanel />
      <ThemeToggle />
      <div className="canvas-help">
        <kbd>LMB</kbd> orbit <kbd>RMB</kbd> pan <kbd>SCROLL</kbd> zoom
      </div>
      <footer className="editor-footer">
        <a
          href="https://github.com/VladimirKobranov"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vlad Kobranov
        </a>
        <span> / v{version}</span>
      </footer>
    </>
  );
}
