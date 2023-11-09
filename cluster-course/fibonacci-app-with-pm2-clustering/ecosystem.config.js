module.exports = {
  apps: [
    {
      name: "Express App",
      script: "server.js",
      instances: "MAX",
      watch: ".",
      autorestart: true,
      max_memory_restart: "1G",
    },
    {
      script: "./service-worker/",
      watch: ["./service-worker"],
    },
  ],
};
