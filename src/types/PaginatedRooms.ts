import { Room } from "../types/Room";

export interface PaginatedRooms {
  data: Room[];
  totalElements: number;
  pageNumber: number;
  totalPage: number;
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}
