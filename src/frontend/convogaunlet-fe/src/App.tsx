import "./App.css";
import MenuBar from "./components/MenuBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Live from "./pages/Live";
import Gestures from "./pages/Gestures";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <MenuBar />
        <Routes>
          <Route path="/live-data" element={<Live />} />
          <Route path="/gestures" element={<Gestures />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
