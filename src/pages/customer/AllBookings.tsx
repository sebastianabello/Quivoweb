import React, { useEffect, useState } from "react";
import CustomerLayout from "../../layouts/CustomerLayout";

interface BookingItem {
  code: string;
  name: string;
  price: number;
  guest: number;
}

interface Booking {
  reservationNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: BookingItem[];
  check: {
    in_date: string;
    out_date: string;
  };
  status: string;
  createdAt: string;
  totalAmount: number;
}

export default function AllBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8989/bookings/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data || []);
      })
      .catch((err) => console.error("Error al cargar reservas:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <CustomerLayout>
      <h1 className="text-2xl font-bold mb-6">Todas las reservas</h1>

      {loading ? (
        <p className="text-gray-500">Cargando reservas...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">No hay reservas registradas.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.reservationNumber}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-teal-700">
                  Reserva #{booking.reservationNumber.slice(0, 8)}...
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Cliente:</strong> {booking.customer.name}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Fechas:</strong> {booking.check.in_date} – {booking.check.out_date}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Total:</strong> ${booking.totalAmount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Estado:</strong> {booking.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </CustomerLayout>
  );
}
