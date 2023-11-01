process.env.UV_THREADPOOL_SIZE = 1; // so that every child has 1 thread

const cluster = require("cluster");
const crypto = require("crypto");

// console.log(cluster.isMaster);

if (cluster.isMaster) {
  /**
   * Master Code
   *
   * - causes index.js to be executed again but in Slave mode
   * - all children has their own thread pool (default of 5 threads)
   * - usually follows the number of machine's physical or logical core/cpu count
   */
  cluster.fork();
  cluster.fork();
} else {
  /**
   * Worker/Child Code
   */
  const express = require("express");
  const app = express();

  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {
      // do nothing
    }
  }

  app.get("/", (req, res) => {
    // doWork(5000);
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send("Hi there");
    });
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  app.listen(3000);
}
