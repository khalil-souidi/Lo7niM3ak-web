import { User } from "./User";

export interface Review {
    id: number;
    note: number;
    message: string;
    user?: User;
  }
