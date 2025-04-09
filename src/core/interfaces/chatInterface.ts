import { IUser } from "./index";

export interface IMessage {
    content: string;
    sender: string;
    timestamp: string;
}

export interface IFastMessage {
    message: string;
}

export interface IRoom {
    id: string;
    name: string;
    users: IUser[];
} 