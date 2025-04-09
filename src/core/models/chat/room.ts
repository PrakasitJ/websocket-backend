import { IRoom, IUser } from "../../interfaces/index";

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