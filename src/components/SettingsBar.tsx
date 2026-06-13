import toolState from "../store/toolState";

export default function SettingsBar() {
  return (
    <div className="h-[40px] bg-white flex items-center shadow-lg mt-2">
      <label htmlFor="line-width">Line width</label>
      <input
        onChange={(e) => toolState.setLineWidth(e.currentTarget.valueAsNumber)}
        id="line-width"
        type="number"
        min={1}
        max={50}
        defaultValue={1}
      />
    </div>
  );
}
