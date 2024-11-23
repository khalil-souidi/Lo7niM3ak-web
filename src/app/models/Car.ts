import { User } from "./User";

export interface Car {
    id: number;
    manufacturer: string;
    model: string;
    numberOfSeats: number;
    color: string;
    licencePlate: string;
    user?: User;
  }
  