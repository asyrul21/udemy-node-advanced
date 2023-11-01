const redis = require("redis");

const redisUrl = "redis://127.0.0.1:6379";

const redisClient = redis.createClient(redisUrl);

/**
 * Nested Hash/Object
 */

redisClient.hset("german", "red", "rot");

redisClient.hget("german", "red", console.log);
