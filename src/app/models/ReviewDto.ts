import { User } from "./User";

export interface ReviewDto {
    id: number;
    rating: number;
    comment: string;
    user?: User;
    userId: number;
    clientName: string;
  }
