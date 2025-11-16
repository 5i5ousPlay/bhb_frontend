import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import MapPage from "./pages/MapPage";
import {SensorPage} from "./pages/SensorPage";
import {AlertsPage} from "./pages/AlertsPage";
import {SensorDetailPage} from "./pages/SensorDetailPage";
import './App.css';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
      <BrowserRouter>
        {/*<nav style={{padding: "0.5rem 1rem", borderBottom: "1px solid #ddd"}}>*/}
        {/*  <Link to="/" style={{marginRight: "1rem"}}>Dashboard</Link>*/}
        {/*  <Link to="/map">Map</Link>*/}
        {/*</nav>*/}

        <Routes>
          <Route path={"/"} element={<DashboardPage/>} />
          <Route path={"/map"} element={<MapPage/>} />
            <Route path={"/map?sensor=ID"} element={<MapPage />}/>
            <Route path={"/sensors"} element={<SensorPage />} />
            <Route path={"/alerts"} element={<AlertsPage />} />
            <Route path="/sensors/:sensorId" element={<SensorDetailPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
