# Udemy Course: Advanced NodeJS

This repository stores the exercise and code-along codes from Udemy course [Node JS: Advanced Concepts](https://www.udemy.com/course/advanced-node-for-developers/)

[Official Repository by Author](https://github.com/StephenGrider/AdvancedNodeComplete)

## Notes

### Apache Benchmarking

[Apache Benchmark](https://vyspiansky.github.io/2019/12/02/apache-bench-for-load-testing/)

```bash
ab -c 2 -n 2 localhost:3000/
```

### PM2 CLI

Cluster Management

https://github.com/Unitech/pm2

```bash
# install
npm install pm2 -g

# run
pm2 start index-pm2.js -i 0

# kill
pm2 delete index

# summary
pm2 list

pm2 show [name]
# pm2 show index-pm2

pm2 monit

# stop
pm2 delete [name]
# pm2 delete index-pm2
```

### Worker Threads

[NPM Package](https://www.npmjs.com/package/webworker-threads)

But it should already come pre-installed in later versions of nodejs

### Redis

[Redis Page](https://redis.io/)

```bash
which brew

brew install redis

# test
redis-server

brew services start redis

brew services stop redis

brew services info redis

# test
redis-cli ping

#cli
redis cli

# remove all data in redis
redisClient.flushall()
```

Node Redis

```bash
npm install node-redis
```

### Project

```
npm install --legacy-peer-deps
```

Files and concepts:

1. routes/blogRoutes.js (Redis/Cache Client example)

2. services/cache.js (Mongoose Query Library Function Customization/Modification)

3. middlewares/clearCache (POST Handler Middleware)

4. tests/header.test.js (Automated Testing)

5. factories/sessionFactory (Creating fake Session for testing)

6. tests/factories/userFactory

7. tests/helpers/Page.js (Proxy / Combine Object Property Access/ Static Build Function)

8. tests/blog.test.js (Executing Arbitrary Javascript in Chromium)

9. .sample.yml (Continuous Integration (CI))

10. ci.js / keys.js

11. index.js (Serving built client files - Common Architectural Pattern)

### Headless Browser Testing

Dependencies: Jest and Puppeteer:

```json
    "jest": "23.6.0",
    "puppeteer": "1.3.0",
```

# Refs

[Keygrip](https://www.npmjs.com/package/keygrip)
