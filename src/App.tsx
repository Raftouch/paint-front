import Canvas from "./components/Canvas";
import SettingsBar from "./components/SettingsBar";
import Toolbar from "./components/Toolbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Toolbar />
      <SettingsBar />
      <Canvas />
    </div>
  );
}

export default App;
