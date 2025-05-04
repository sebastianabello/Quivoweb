import axios from "../lib/axios";
export const getAvailableRooms = async () => {
  const res = await axios.get("/api/rooms/available");
  return res.data;
};
