import { PaymentMethod } from "./PaymentMethode";
import { Reservation } from "./Reservation";

export interface Bill {
    id: number;
    totalAmount: number;
    paid: boolean;
    billReference: string;
    paymentMethod: PaymentMethod;
    createdAt: Date;
    reservation?: Reservation;
  }
  