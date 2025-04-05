import { Elysia } from "elysia";

const main = new Elysia();

main.get("/", () => "Hello, Elysia").get("/main", () => "Hello World");

export { main };
