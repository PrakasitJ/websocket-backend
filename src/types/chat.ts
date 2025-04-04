import { User } from "./index";

export interface Message {
    content: string;
    sender: string;
    timestamp: string;
}

export interface FastMessage {
    message: string;
  } 

export interface Room {
    id: string;
    name: string;
    users: User[];
}