import React from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ value, onChange }: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex justify-center gap-2 mb-2">
      <div className="bg-gray-100 px-4 py-2 rounded-full flex items-center w-full max-w-2xl">
        <span className="text-sm text-gray-500 pr-2 border-r">Categoría</span>
        <Input
          type="text"
          className="border-none outline-none bg-transparent w-full px-2"
          placeholder="Buscar categoría"
          value={value}
          onChange={onChange}
        />
        <Button size="icon" className="rounded-full">
          <FaSearch />
        </Button>
      </div>
    </div>
  );
}
