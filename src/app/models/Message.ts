import { User } from "./User";

export interface Message {
    id: number;
    sender?: User;
    receiver?: User;
    content: string;
    timestamp: Date;
    isRead: boolean;
  }
  