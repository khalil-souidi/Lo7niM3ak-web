import { Car } from "./Car.js";
import { Drive } from "./Drives.js";
import { Reservation } from "./Reservation.js";
import { Review } from "./Review.js";

export interface User {
    id: number;
    password: string;
    name: string;
    firstName: string;
    email: string;
    phone: string;
    role: string;
    documents?: Document[];
    reviews?: Review[];
    cars?: Car[];
    drives?: Drive[];
    reservations?: Reservation[];
  }
  