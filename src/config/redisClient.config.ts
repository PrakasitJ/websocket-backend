import { RedisClientOptions } from "redis";

const redisConfig : RedisClientOptions = {
    url: process.env.REDIS_URL || "redis://redis:6379"
}

export default redisConfig;
