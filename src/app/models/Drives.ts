import { User } from "./User";

export interface Drive {
  id: number;
  pickup: string;
  destination: string;
  deptime: string;
  price: number;
  seating: number;
  description: string;
  driverId: number;
  driver?: User;
  avgNote?: number;
  car?: {
    manufacturer: string;
    model: string;
    licence_plate: string;
  };
}
