const redis = require("redis");

const redisUrl = "redis://127.0.0.1:6379";

const redisClient = redis.createClient(redisUrl);

// set value
redisClient.set("hi", "there");

// get
redisClient.get("hi", (err, val) => {
  console.log(`The value is ${val}`);
});

// get
redisClient.get("hi", console.log);
