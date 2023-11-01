// ab -c 1 -n 1 localhost:3000/
const express = require("express");
const crypto = require("crypto");
const app = express();
const { Worker } = require("worker_threads");

app.get("/", (req, res) => {
  const worker = new Worker("./workers/worker.js");

  worker.on("message", function (myCounter) {
    console.log("Counter:", myCounter);
    res.send("" + myCounter);
  });

  worker.postMessage("start!");
});

app.get("/fast", (req, res) => {
  res.send("This was fast!");
});

app.listen(3000);
