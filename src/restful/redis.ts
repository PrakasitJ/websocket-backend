import Elysia, { t } from "elysia";
import { RedisService } from "../services/redisService";

const redis = new Elysia({
    prefix: "/redis"
});

function createResponse(success: boolean, message: string, value: any) {
    return {
        success,
        message,
        value
    };
}   


redis.get("/:key", async ({params: {key}}) => {
    const redisService = RedisService.getInstance();
    const value = await redisService.get(key);
    return createResponse(true, "Get key and value successfully", value);
}, {
    params: t.Object({
        key: t.String()
    })
});

redis.post("/", async ({body: {key, value}}) => {
    const redisService = RedisService.getInstance();
    await redisService.set(key, value);
    return createResponse(true, "Set key and value successfully", null);
}, {
    body: t.Object({
        key: t.String(),
        value: t.String()
    })
});

export { redis };