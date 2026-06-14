import toolState from "../store/toolState";

export default function SettingsBar() {
  return (
    <div className="p-4 h-[40px] bg-white flex items-center shadow-lg mt-2">
      <label
        htmlFor="line-width"
        className="mr-2 text-sm font-medium text-gray-700"
      >
        Line width
      </label>
      <input
        onChange={(e) => toolState.setLineWidth(e.currentTarget.valueAsNumber)}
        id="line-width"
        type="number"
        min={1}
        max={50}
        defaultValue={1}
        className="w-16 rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
      />
      <label htmlFor="stroke-color">Stroke color</label>
      <input
        onChange={(e) => toolState.setStrokeColor(e.currentTarget.value)}
        id="stroke-color"
        type="color"
      />
    </div>
  );
}
