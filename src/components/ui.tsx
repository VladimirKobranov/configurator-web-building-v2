import { useAppStore } from "@/store";

export default function UiPanel() {
  const autoRotateSpeed = useAppStore((s) => s.autoRotateSpeed);
  const setAutoRotateSpeed = useAppStore((s) => s.setAutoRotateSpeed);

  return (
    <div className="z-100 text-white fixed top-10 left-10">
      <h1>{autoRotateSpeed} bears around</h1>
      <input
        type="range"
        min={0}
        max={5}
        step={0.25}
        defaultValue={autoRotateSpeed}
        onChange={(e) => setAutoRotateSpeed(Number(e.target.value))}
      />
    </div>
  );
}
