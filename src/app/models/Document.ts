import { User } from "./User";

export interface Document {
    id: number;
    title: string;
    url: string;
    user?: User;
  }
  