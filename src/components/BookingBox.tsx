// components/BookingBox.tsx
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { Room } from "../types/Room";

interface Props {
  room: Room;
}

export default function BookingBox({ room }: Props) {
  const [guest, setGuest] = useState(1);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBooking = async () => {
    if (!dateRange.startDate || !dateRange.endDate) return alert("Seleccione fechas válidas");
    setLoading(true);
    try {
      const payload = {
        items: [
          {
            code: room.code,
            name: room.name,
            price: room.price,
            guest: guest,
          },
        ],
        customer,
        checkDate: {
          in_date: dateRange.startDate,
          out_date: dateRange.endDate,
        },
      };
      const res = await fetch("http://localhost:8082/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        alert("Error al reservar");
      }
    } catch (err) {
      console.error(err);
      alert("Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        ${room.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">por noche</span>
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Fechas</label>
        <Datepicker
          primaryColor="teal"
          value={dateRange}
          onChange={(val) => setDateRange(val)}
          showShortcuts={true}
          placeholder="Selecciona fechas"
          inputClassName="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Huéspedes</label>
        <select
          value={guest}
          onChange={(e) => setGuest(Number(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        >
          {[1, 2, 3, 4, 5].map((g) => (
            <option key={g} value={g}>
              {g} huésped{g > 1 ? "es" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="text-sm font-medium text-gray-700 block mb-1">Nombre</label>
        <input
          type="text"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>
      <div className="mb-2">
        <label className="text-sm font-medium text-gray-700 block mb-1">Correo electrónico</label>
        <input
          type="email"
          value={customer.email}
          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 block mb-1">Teléfono</label>
        <input
          type="tel"
          value={customer.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      <button
        onClick={handleBooking}
        disabled={loading}
        className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:to-red-600 text-white font-semibold py-2 rounded text-sm"
      >
        {loading ? "Reservando..." : "Reserva"}
      </button>

      {success && (
        <p className="mt-3 text-green-600 text-sm font-medium">¡Reserva realizada con éxito!</p>
      )}
    </div>
  );
}
