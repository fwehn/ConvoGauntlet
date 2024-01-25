import "./App.css";
import MenuBar from "./components/MenuBar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Live from "./pages/Live";
import Gestures from "./pages/Gestures";
import { Box } from "@mui/material";

const App: React.FC = () => {
  return (
    <Router>
      <Box component={"div"}>
        <MenuBar />
        <Routes>
          <Route path="*" element={<Navigate to="/live-data" />} />
          <Route path="/live-data" element={<Live />} />
          <Route path="/gestures" element={<Gestures />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
