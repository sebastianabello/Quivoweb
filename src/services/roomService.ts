import axios from "../lib/axios";

export const getRooms = async (page = 1) => {
  const response = await axios.get(`/api/rooms?page=${page}`);
  return response.data;
};
