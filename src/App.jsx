import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './components/Home';
import VehiculoList from './components/VehiculoList';
import VehiculoAdd from './components/VehiculoAdd';
import ReparacionAdd from './components/ReparacionAdd';
import ReparacionList from './components/ReparacionList';
import ReparacionEdit from './components/ReparacionEdit';


function App() {
  return (
      <Router>
          <div className="container">
          <Navbar></Navbar>
            <Routes>
              <Route path="/home" element={<Home/>} />
              <Route path="/vehiculo/list" element={<VehiculoList/>} />
              <Route path="/vehiculo/add" element={<VehiculoAdd/>} />
              <Route path="/vehiculo/edit/:id" element={<VehiculoAdd/>} />
              <Route path="/reparacion/list" element={<ReparacionList/>} />
              <Route path="/reparacion/list/:id" element={<ReparacionList/>} />
              <Route path="/reparacion/add" element={<ReparacionAdd/>} />
              <Route path="/reparacion/add/:idVehiculo" element={<ReparacionAdd/>} />
              <Route path="/reparacion/edit/:id" element={<ReparacionEdit/>} />
              
            </Routes>
          </div>
      </Router>
  );
}

export default App
