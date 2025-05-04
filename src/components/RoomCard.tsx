import React from "react";
import { FaStar } from "react-icons/fa";

type RoomCardProps = {
  title: string;
  rating: number;
  price: number;
};

export default function RoomCard({ title, rating, price }: RoomCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="h-40 bg-gray-300" />
      <div className="p-4">
        <div className="text-sm font-semibold mb-1">{title}</div>
        <div className="flex items-center text-sm text-gray-700">
          <FaStar className="text-yellow-400 mr-1" /> {rating}
        </div>
        <div className="text-sm mt-1">
          <span className="text-teal-600 font-semibold">
            ${price.toLocaleString()}
          </span> por noche
        </div>
      </div>
    </div>
  );
}
