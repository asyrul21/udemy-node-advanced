process.env.UV_THREADPOOL_SIZE = 5; // changing threadpool size

const https = require("https");
const crypto = require("crypto");
const fs = require("fs");

const start = Date.now();

/**
 * doHash uses Thread Pool
 */
function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash:", Date.now() - start);
  });
}

/**
 * HTTPS does not use Thread Pool. Skips Thread Pool mechanism
 */
function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log("Request:", Date.now() - start);
      });
    })
    .end();
}

/**
 * Thread pool size is 4 by default.
 */

//****************************

doRequest();

// immediately invoked
/**
 * FS uses Thread Pool.
 * Files are not immediately read. Some statistics were run first
 * to find out how big the file is etc.
 */
fs.readFile("multitask.js", "utf-8", () => {
  console.log("FS:", Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();
