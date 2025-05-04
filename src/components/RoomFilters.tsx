import React from "react";

interface Props {
  filter: {
    search: string;
    minPrice: number;
    maxPrice: number;
  };
  onFilterChange: (key: string, value: string | number) => void;
}

export default function RoomFilters({ filter, onFilterChange }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Buscar habitación..."
        value={filter.search}
        onChange={(e) => onFilterChange("search", e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 text-sm w-full md:w-64"
      />
      <input
        type="number"
        placeholder="Precio mínimo"
        value={filter.minPrice}
        onChange={(e) => onFilterChange("minPrice", Number(e.target.value))}
        className="border border-gray-300 rounded px-4 py-2 text-sm w-full md:w-40"
      />
      <input
        type="number"
        placeholder="Precio máximo"
        value={filter.maxPrice}
        onChange={(e) => onFilterChange("maxPrice", Number(e.target.value))}
        className="border border-gray-300 rounded px-4 py-2 text-sm w-full md:w-40"
      />
    </div>
  );
}
