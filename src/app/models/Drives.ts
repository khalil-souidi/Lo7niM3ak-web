import { Reservation } from "./Reservation";
import { User } from "./User";

export interface Drive {
    id: number;
    pickup: string;
    destination: string;
    deptime: Date;
    price: number;
    seating: number;
    description: string;
    driverId: number
    driver?: User;
    avgNote?: number;
  }

