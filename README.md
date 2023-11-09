# Udemy Course: Advanced NodeJS

This repository stores the exercise and code-along codes from Udemy courses:

1. [Node JS: Advanced Concepts](https://www.udemy.com/course/advanced-node-for-developers/)

[Official Repository by Author](https://github.com/StephenGrider/AdvancedNodeComplete)

2. [Node JS Cluster with PM2, Rabbit MQ, Redis and Nginx](https://www.udemy.com/course/node-js-cluster/)

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

# run using ecosystem
pm2 start ecosystem.config.js

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

12. client/src/components/BlogFormReview.js - UI Image Upload

13. client/src/actions/index.js - `submitBlog` - UI Image Upload

14. routes/uploadRoutes.js - Image Upload Mechanism

15. client/src/components/BlogShow.js - `renderImage` function

### Headless Browser Testing

Dependencies: Jest and Puppeteer:

```json
    "jest": "23.6.0",
    "puppeteer": "1.3.0",
```

### AWS Notes

S3 Bucket-Specific Access Policy (Visual):

1. Create New Policy on AWS (course-node-advanced-s3-policy)

2. Select Service - S3

3. Check 'All S3 Actions'

4. Go to Bucket - Add ARNs

5. Go to Object - Add ARNs

6. Create user (course-node-advanced-user) and assing policy to him

7. Grab the Access Key ID and Secret Access Key

8. JSON Policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "s3:ListStorageLensConfigurations",
        "s3:ListAccessPointsForObjectLambda",
        "s3:GetAccessPoint",
        "s3:PutAccountPublicAccessBlock",
        "s3:GetAccountPublicAccessBlock",
        "s3:ListAllMyBuckets",
        "s3:ListAccessPoints",
        "s3:PutAccessPointPublicAccessBlock",
        "s3:ListJobs",
        "s3:PutStorageLensConfiguration",
        "s3:ListMultiRegionAccessPoints",
        "s3:CreateJob"
      ],
      "Resource": "*"
    },
    {
      "Sid": "VisualEditor1",
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::course-node-advanced",
        "arn:aws:s3:::course-node-advanced/*"
      ]
    }
  ]
}
```

Install aws-dsk

```bash
npm install --save aws-sdk
```

Install UUID

```bash
npm install --save uuid
```

S3 CORS Configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT"],
    "AllowedOrigins": ["http://localhost:3000"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3000
  }
]
```

S3 Bucket Policy:

```json
{
  "Id": "Policy1698974539505",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1698974538199",
      "Action": ["s3:GetObject"],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::course-node-advanced/*",
      "Principal": "*"
    }
  ]
}
```

# Node JS Clustering Course

## Dependencies and Tools

```bash
# load test / concurrent test
npm install -g loadtest

# artillery
npm install -g artillery
```

## Load Testing

```bash
loadtest -n 1000 -c 100 --rps 200 [endpoint] # -c is concurrent request count
```

## Artillery Ad Hoc Testing

```bash
artillery quick --count 10 -n 20 [endpoint]
```

## Sample PM2 Process File

```bash
# generate
pm2 [file name]
# pm2 ecosystem

# run
pm2 start
```

Location:

/cluster-course/fibonacci-app-with-pm2-clustering/ecosystem.config.js

```js
module.exports = {
  apps: [
    {
      script: "index.js",
      watch: ".",
    },
    {
      script: "./service-worker/",
      watch: ["./service-worker"],
    },
  ],

  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "GIT_REPOSITORY",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
```

## RabbitMQ

### Installation

1. Install on computer/macOS using homebrew: https://www.rabbitmq.com/install-homebrew.html, and run it as a service:

```bash
brew services list
brew services start rabbitmq

# web interface:
# userId: guest
# password: guest
http://localhost:15672
```

2. Install amqp

```bash
npm install --save amqplib # rabbittmq client for nodejs
```

### Listing Out All Queues

1. Navigate to rabbitmq bin location on machine

2. Run

```bash
rabbitmqctl list_queues
```

## Nginx

### Setup

[Ref](https://medium.com/@ThomasTan/installing-nginx-in-mac-os-x-maverick-with-homebrew-d8867b7e8a5a)

```bash
# Install
brew update
brew install nginx

# Run
# sudo nginx
brew services start nginx

# Navigator
# http://localhost:8080

# Installation location for MacOS
# which nginx
# /opt/homebrew/bin/nginx # binary

# Find the configuration file path
nginx -t
# nginx: the configuration file /opt/homebrew/etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /opt/homebrew/etc/nginx/nginx.conf test is successful

# Find webroot path
nginx -V
# you will see --prefix=/opt/homebrew/Cellar/nginx/1.25.3
# inside you will find html folder > index.html

# Stop
# sudo nginx -s stop

# Commands
# sudo nginx -s stop/quit/reload/reopen
```

# TODO

- try out clustering with pm2, rabbit mq

- try out nginx reverse proxy and load balancer

# Refs

[Keygrip](https://www.npmjs.com/package/keygrip)

```

```
