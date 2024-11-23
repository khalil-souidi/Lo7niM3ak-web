import { Bill } from "./Bill.js";
import { Drive } from "./Drives.js";
import { Status } from "./Status.js";
import { User } from "./User.js";


export interface Reservation {
    id: number;
    seats: number;
    drive?: Drive;
    user?: User;
    status: Status;
    bill?: Bill;
  }
  