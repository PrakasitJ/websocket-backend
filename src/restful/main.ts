import { Elysia } from "elysia";
import { app } from "../index";

const main = new Elysia();

main.get("/main", () => "Hello World");

export { main };
