import { createClient } from "redis";
import env from "./cleanedenv.js";

const redisClient = createClient({
    url: env.REDIS_URL
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

export { redisClient };
