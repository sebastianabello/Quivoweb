import React from "react";
import { FaStar } from "react-icons/fa";
import { Room } from "../types/Room";

type Props = {
  room: Room;
};

export default function RoomCard({ room }: Props) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-full flex flex-col">
      <img
        src={room.imageUrl}
        alt={room.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold text-gray-900">{room.name}</h2>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <FaStar className="text-gray-900"/>
            <span>4.8</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-2">{room.description}</p>
        <div className="mt-auto text-teal-600 font-semibold">
          ${room.price.toLocaleString()} <span className="text-sm text-gray-500 font-normal">por noche</span>
        </div>
      </div>
    </div>
  );
}


