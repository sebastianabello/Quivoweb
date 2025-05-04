// pages/customer/Home.tsx
import React from "react";

import CustomerLayout from "../../layouts/CustomerLayout";
import SearchBar from "../../components/SearchBar";
import RoomCard from "../../components/RoomCard";
import { useState } from "react";

const categories = ["Conferencia", "Boda", "Fiesta", "Negocios"];
const listings = Array(4).fill({
  title: "Plus 4k habitación",
  rating: 4.9,
  price: 20000,
});

export default function Home() {
  const [category, setCategory] = useState("");

  return (
    <CustomerLayout>
      <section className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Convierte tu estadía en una experiencia inolvidable
        </h1>
        <p className="text-sm text-gray-600">
          Encuentra organizadores, servicios y todo lo que necesitas para un evento inolvidable.
        </p>
      </section>

      <SearchBar value={category} onChange={(e) => setCategory(e.target.value)} />

      <p className="text-center text-xs text-gray-500 mb-6">
        Búsquedas populares: Bodas, Conferencias, Fiestas, Eventos empresariales
      </p>

      <div className="flex items-center gap-3 overflow-x-auto mb-6">
        {categories.map((cat, i) => (
          <div key={i} className="flex flex-col items-center min-w-max">
            <img src="/category-icon.svg" alt="" className="h-6 mb-1" />
            <span className="text-sm">{cat}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {listings.map((item, i) => (
          <RoomCard
            key={i}
            title={item.title}
            rating={item.rating}
            price={item.price}
          />
        ))}
      </div>
    </CustomerLayout>
  );
}

