import { Client } from "../node_modules/@types/pg/index.js";

export const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    port: 5432,
    password: "123"
});

client.connect()
    .then(() => console.log("connected to pg"))
    .catch((err) => console.error("can't connect", err));


