import { User } from "./User";

export interface Car {
    id: number;
    manufacturer: string;
    model: string;
    number_of_seats: number;
    color: string;
    licence_plate: string;
    user?: User;
  }
  