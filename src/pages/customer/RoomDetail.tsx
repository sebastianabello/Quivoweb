// pages/customer/RoomDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerLayout from "../../layouts/CustomerLayout";
import { Room } from "../../types/Room";

interface RoomWithGallery extends Room {
  gallery?: string[]; // array opcional de imágenes adicionales
}

export default function RoomDetail() {
  const { code } = useParams();
  const [room, setRoom] = useState<RoomWithGallery | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8081/api/rooms/${code}`)
      .then((res) => res.json())
      .then(setRoom)
      .catch((err) => console.error("Error cargando detalle de habitación", err));
  }, [code]);

  if (!room) {
    return (
      <CustomerLayout>
        <p className="text-center text-gray-500 mt-10">Cargando habitación...</p>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{room.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
          <img
            src={room.imageUrl}
            alt={room.name}
            className="w-full h-64 object-cover rounded col-span-1 md:col-span-2 lg:col-span-3"
          />
          {(room.gallery || [room.imageUrl, room.imageUrl, room.imageUrl]).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Foto ${idx + 1}`}
              className="w-full h-40 object-cover rounded"
            />
          ))}
        </div>

        <p className="text-gray-600 mb-4">{room.description}</p>
        <p className="text-teal-600 text-xl font-semibold">${room.price} por noche</p>
      </div>
    </CustomerLayout>
  );
}
