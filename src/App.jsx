import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/customer/Home'
import RoomDetail from "./pages/customer/RoomDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms/:code" element={<RoomDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
