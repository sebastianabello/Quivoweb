import React, { useState, useRef, useEffect } from "react";
import { Room } from "../types/Room";
import { DateRange } from "react-date-range";
import { addDays, format } from "date-fns";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface Props {
  room: Room;
}

export default function BookingBox({ room }: Props) {
  const [guest, setGuest] = useState(1);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
      color: '#0f766e', // teal-700
    },
  ]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !(calendarRef.current as any).contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBooking = async () => {
    const inDate = range[0].startDate?.toISOString().split('T')[0];
    const outDate = range[0].endDate?.toISOString().split('T')[0];

    if (!inDate || !outDate) return alert("Seleccione fechas válidas");

    setLoading(true);
    try {
      const payload = {
        items: [{ code: room.code, name: room.name, price: room.price, guest }],
        customer,
        checkDate: {
          in_date: inDate,
          out_date: outDate,
        },
      };

      const res = await fetch("http://localhost:8082/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      {/* Fechas */}
      <div className="mb-4 relative" ref={calendarRef}>
        <label className="block text-sm font-medium text-gray-700 mb-1">Fechas</label>
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-left bg-white"
        >
          {format(range[0].startDate!, 'dd/MM/yyyy')} - {format(range[0].endDate!, 'dd/MM/yyyy')}
        </button>

        {showCalendar && (
          <div className="absolute z-50 mt-2 shadow border rounded">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                setRange([item.selection]);
                if (item.selection.startDate && item.selection.endDate && item.selection.startDate !== item.selection.endDate) {
                  setShowCalendar(false);
                }
              }}

              moveRangeOnFirstSelection={false}
              ranges={range}
              rangeColors={["#0f766e"]} // override default blue
            />
          </div>
        )}
      </div>

      {/* Huéspedes */}
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

      {/* Cliente */}
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

      {/* Botón */}
      <button
        onClick={handleBooking}
        disabled={loading}
        className="w-full bg-gradient-to-r bg-teal-600 hover:to-teal-700 text-white font-semibold py-2 rounded text-sm"
      >
        {loading ? "Reservando..." : "Reserva"}
      </button>

      {success && (
        <p className="mt-3 text-green-600 text-sm font-medium">¡Reserva realizada con éxito!</p>
      )}
    </div>
  );
}
