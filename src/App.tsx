import Canvas from "./components/Canvas";
import SettingsBar from "./components/SettingsBar";
import Toolbar from "./components/Toolbar";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Routes>
        <Route
          path="/:id"
          element={
            <>
              <Toolbar />
              <SettingsBar />
              <Canvas />
            </>
          }
        />
        <Route
          path="*"
          element={<Navigate to={`f${(+new Date()).toString(16)}`} replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
