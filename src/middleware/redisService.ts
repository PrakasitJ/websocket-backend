import { createClient } from "redis";
import redisConfig from "../config/redisClient.config";

export class RedisService {
    private static instance: RedisService;
    private redis: ReturnType<typeof createClient>;

    constructor() {
        this.redis = createClient(redisConfig);
    }   

    public static getInstance() {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService();
        }
        return RedisService.instance;
    }

    public async start() {
        await this.redis.connect();
    }

    public async stop() {
        await this.redis.disconnect();
    }

    async connect() {
        await this.redis.connect();
    }

    async disconnect() {
        await this.redis.disconnect();
    }

    async get(key: string) {
        return await this.redis.get(key);
    }

    async set(key: string, value: string) {
        await this.redis.set(key, value);
    }

    async del(key: string) {
        await this.redis.del(key);
    }

    async expire(key: string, seconds: number) {
        await this.redis.expire(key, seconds);
    }

    async ttl(key: string) {
        return await this.redis.ttl(key);
    }

    async keys(pattern: string) {
        return await this.redis.keys(pattern);
    }

    async hset(key: string, field: string, value: string) {
        await this.redis.hSet(key, field, value);
    }

    async hget(key: string, field: string) {
        return await this.redis.hGet(key, field);
    }

    async hgetall(key: string) {
        return await this.redis.hGetAll(key);
    }

    async hdel(key: string, field: string) {
        await this.redis.hDel(key, field);
    }

    async hkeys(key: string) {
        return await this.redis.hKeys(key);
    }

    async hvals(key: string) {
        return await this.redis.hVals(key);
    }

    async hlen(key: string) {
        return await this.redis.hLen(key);
    }

    async hincrby(key: string, field: string, increment: number) {
        return await this.redis.hIncrBy(key, field, increment);
    }

    async hincrbyfloat(key: string, field: string, increment: number) {
        return await this.redis.hIncrByFloat(key, field, increment);
    }    
}   
