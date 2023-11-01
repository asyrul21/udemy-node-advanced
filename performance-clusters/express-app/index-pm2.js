const express = require("express");
const crypto = require("crypto");
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
