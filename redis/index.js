import redis from "redis";
import { REDIS } from "../config/index.js";

const client = redis.createClient({
  socket: {
    host: REDIS.HOST,
    port: REDIS.PORT,
  },
});

client.on("error", (err) => {
  console.error("Redis connection error:", err);
});

client.on("connect", () => {
  console.log("Redis connected");
});

await client.connect();

export default client;
