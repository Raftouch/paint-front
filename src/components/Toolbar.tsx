import Button from "./Button";

export default function Toolbar() {
  return (
    <div className="h-[40px] bg-white flex items-center justify-between shadow-lg p-4">
      <div className="space-x-4 flex items-center">
        <Button imageName="brush" />
        <Button imageName="rect" />
        <Button imageName="circle" />
        <Button imageName="eraser" />
        <Button imageName="line" />
      </div>

      <div className="space-x-4 flex items-center">
        <Button imageName="undo" />
        <Button imageName="redo" />
        <Button imageName="save" />
      </div>
    </div>
  );
}
