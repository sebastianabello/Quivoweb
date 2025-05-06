import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/customer/Home'
import RoomDetail from "./pages/customer/RoomDetail";
import BookingDetail from "./pages/customer/BookingDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms/:code" element={<RoomDetail />} />
        <Route path="/booking/:reservationNumber" element={<BookingDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
