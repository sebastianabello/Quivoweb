import React, { useEffect, useState } from "react";
import CustomerLayout from "../../layouts/CustomerLayout";
import SearchBar from "../../components/SearchBar";
import RoomCard from "../../components/RoomCard";
import { getRooms } from "../../services/roomService";
import { Room } from "../../types/Room";

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filter, setFilter] = useState({
    search: "",
    minPrice: '',
    maxPrice: 10000,
  });

  const handleFilterChange = (key: string, value: string | number) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const fetchRooms = async (page: number) => {
    try {
      const res = await getRooms(page);
      setRooms(Array.isArray(res?.data) ? res.data : []);
      setCurrentPage(res?.pageNumber ?? 1);
      setTotalPages(res?.totalPage ?? 1);
    } catch (err) {
      console.error("Error al obtener habitaciones:", err);
      setRooms([]);
    }
  };

  useEffect(() => {
    fetchRooms(currentPage);
  }, [currentPage]);

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(filter.search.toLowerCase());
    const matchesMin = room.price >= Number(filter.minPrice);
    const matchesMax = room.price <= filter.maxPrice;
    const matchesCategory =
      !selectedCategory || room.name.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesMin && matchesMax && matchesCategory;
  });

  return (
    <CustomerLayout>
      <section className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Convierte tu estadía en una experiencia inolvidable
        </h1>
        <p className="text-sm text-gray-600">
          Descubre alojamientos únicos para cada tipo de viaje.
        </p>
      </section>

      <SearchBar
        value={filter.search}
        onChange={(e) => handleFilterChange("search", e.target.value)}
        onFilterClick={() => setShowFilters(true)}
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <p className="text-center text-xs text-gray-500 mb-6">
        Búsquedas populares: Escapadas románticas, Viajes de negocios, Vacaciones en familia, Hoteles con vista al mar
      </p>

      {filteredRooms.length === 0 ? (
        <p className="text-center text-gray-500">No se encontraron resultados</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard key={room.code} room={room} />
          ))}
        </div>
      )}

      {/* Paginación */}
      <div className="flex justify-center gap-2 mt-8">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-teal-600 text-white disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-700 flex items-center">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-teal-600 text-white disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      {/* Modal de filtros */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-lg">
            {/* Header */}
            <div className="p-4 border-b border-gray-300 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Filtros</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>
            </div>

            {/* Contenido del filtro */}
            <div className="p-4 overflow-y-auto flex-1">
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Precio por noche</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Mínimo"
                    value={filter.minPrice}
                    onChange={(e) => handleFilterChange("minPrice", Number(e.target.value))}
                    className="border border-gray-300 rounded w-full px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Máximo"
                    value={filter.maxPrice}
                    onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
                    className="border border-gray-300 rounded w-full px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Pie con botones */}
            <div className="p-4 border-t border-gray-300 flex justify-between items-center bg-white">
              <button
                onClick={() => {
                  setFilter((prev) => ({ ...prev, minPrice: 0, maxPrice: 10000 }));
                  setSelectedCategory("");
                }}
                className="text-sm text-gray-600 hover:underline"
              >
                Limpiar filtros
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded text-sm"
              >
                Mostrar resultados
              </button>
            </div>
          </div>
        </div>
      )}
    </CustomerLayout>
  );
}
