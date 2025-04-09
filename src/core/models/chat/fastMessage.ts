import { IMessage } from "../../interfaces/chatInterface";

export class FastMessage implements IMessage {
    content: string;
    sender: string;
    timestamp: string;

    constructor(message: string) {
        this.content = message;
        this.sender = "Anonymous";
        this.timestamp = new Date().toISOString();
    }

    public setSenderToAnnonymous() {
        this.sender = "Anonymous";
        return this;
    }

    public useHelloMapper() {
        this.content = this.content.replaceAll(/H?h?ello/g, "👋");
        return this;
    }

    public useWorldMapper() {
        this.content = this.content.replaceAll(/W?w?orld/g, "🌍");
        return this;
    }

    public useGhostMapper() {
        this.content = this.content.replaceAll(/G?g?host/g, "👻");
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