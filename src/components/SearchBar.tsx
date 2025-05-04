import React, { useState, useRef, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { FaSearch, FaFilter, FaChevronDown } from "react-icons/fa";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterClick: () => void;
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

export default function SearchBar({
  value,
  onChange,
  onFilterClick,
  onCategorySelect,
  selectedCategory,
}: Props) {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as any).contains(event.target)) {
        setShowCategoryMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = [
    "Deluxe",
    "Familiar",
    "Económica",
    "Vista",
    "Suite",
    "Penthouse",
  ];

  return (
    <div className="flex justify-center gap-2 mb-6 relative">
      <div className="bg-gray-100 px-4 py-2 rounded-full flex items-center w-full max-w-2xl relative">
        <button
          onClick={() => setShowCategoryMenu(!showCategoryMenu)}
          className="text-sm text-gray-500 pr-2 border-r flex items-center gap-1 focus:outline-none"
        >
          Categoría <FaChevronDown className="text-xs" />
        </button>
        <Input
          type="text"
          className="border-none outline-none bg-transparent w-full px-2"
          placeholder="Buscar categoría"
          value={value}
          onChange={onChange}
        />
        <Button size="icon" className="rounded-full mr-2" onClick={onFilterClick}>
          <FaFilter />
        </Button>
        <Button size="icon" className="rounded-full">
          <FaSearch />
        </Button>

        {showCategoryMenu && (
          <div
            ref={menuRef}
            className="absolute top-full mt-2 left-0 bg-white rounded shadow w-48 z-50"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onCategorySelect(cat);
                  setShowCategoryMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                {cat}
              </button>
            ))}
            {selectedCategory && (
              <button
                onClick={() => {
                  onCategorySelect("");
                  setShowCategoryMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 border-t"
              >
                Borrar categoría seleccionada
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
