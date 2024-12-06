import { User } from './User';

export interface Document {
  id: number;
  title: string;
  content?: string;
  user?: User;
}
