import dotenv from "dotenv";
dotenv.config();
import app from './app';
import http from 'http';
import { log } from "console";
const port = "4080";
const host = process.env.HOST || "localhost";
const server = http.createServer(app);

server.listen(port, () => {
    log(`[server]: Server is running at http://${host}:${port}`);
});
