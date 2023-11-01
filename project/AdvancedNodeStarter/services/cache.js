const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");

const keys = require("../config/keys");

const redisClient = redis.createClient(keys.redisUrl);

/**
 * DO NOT USE ARROW FUNCTION
 *
 * this refers to the Query instance.
 */

// promisify
redisClient.get = util.promisify(redisClient.get);
redisClient.hget = util.promisify(redisClient.hget);

// original function copy
const exec = mongoose.Query.prototype.exec;

/**
 * Providing a custom pipeline/chain method to mongoose
 * eg. await Blog.find({ ... }).cache();
 */
mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;

  this.hashKey = JSON.stringify(options.key || "");

  return this;
};

/**
 * Override Mongoose's [exec] method
 */
mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    // skip cache mechanism
    return exec.apply(this, arguments);
  }

  //   console.log(this.getQuery()); // the current query
  //   console.log(this.mongooseCollection.name); // get collection name

  // copy result of this.getQuery() and extend with collection prop
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  // see if we have a value for 'key' in redis
  //   const cacheValue = await redisClient.get(key);
  const cacheValue = await redisClient.hget(this.hashKey, key);

  // if we do, return it
  if (cacheValue) {
    console.log("Returning from cache!");
    const docs = JSON.parse(cacheValue);

    // reinstantiate the documents into their respective models
    if (Array.isArray(docs)) {
      return docs.map((d) => new this.model(d));
    } else {
      return new this.model(docs);
    }
  }

  // Otherwise, execute the query, then store the result in the cache
  const queryResult = await exec.apply(this, arguments);
  //   redisClient.set(key, JSON.stringify(queryResult), "EX", 10);
  redisClient.hset(this.hashKey, key, JSON.stringify(queryResult), "EX", 10);

  console.log("Executing Query to DB!");
  // call the original method
  return queryResult;
};

module.exports = {
  clearHash(hashKey) {
    redisClient.del(JSON.stringify(hashKey));
  },
};
