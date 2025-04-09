import { IMessage } from "../../interfaces/chatInterface";

export class Message implements IMessage {
    content: string;
    sender: string;
    timestamp: string;

    constructor(content: string, sender: string) {
        this.content = content;
        this.sender = sender;
        this.timestamp = new Date().toISOString();
    }

    public setSenderToAnnonymous() {
        this.sender = "Anonymous";
        return this;
    }

    public setTimestampToUTC() {
        this.timestamp = new Date().toUTCString();
        return this;
    }

    public setTimestampToLocal() {
        this.timestamp = new Date().toLocaleString();
        return this;
    }

    public toJSON() {
        return {
            content: this.content,
            sender: this.sender,
            timestamp: this.timestamp
        };
    }
}