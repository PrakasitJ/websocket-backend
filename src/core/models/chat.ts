import { IFastMessage, IMessage, IRoom, IUser } from "../interfaces/index";

export class Message implements IMessage {
    content: string;
    sender: string;
    timestamp: string;

    constructor(content: string, sender: string) {
        this.content = content;
        this.sender = sender;
        this.timestamp = new Date().toISOString();
    }
}

export class FastMessage implements IFastMessage {
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}

export class Room implements IRoom {
    id: string;
    name: string;
    users: IUser[];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.users = [];
    }

    addUser(user: IUser) {
        this.users.push(user);
    }

    removeUser(username: string) {
        this.users = this.users.filter(user => user.username !== username);
    }
}