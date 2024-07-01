

import { Route, Routes } from "react-router-dom";
import Home from './Component/Home';
import RoomUi from './Component/RoomUi';
import Dashboard from "./Component/Dashboard/Dashboard";


const App = () => {
  return <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/call' element={<RoomUi/>} />
    <Route path='/dashboard' element={<Dashboard/>} />
  </Routes>
}

export default App
