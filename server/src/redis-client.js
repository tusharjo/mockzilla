const host =
  process.env.dev === "development"
    ? "redis-server"
    : process.env.OPENSHIFT_MOCKME_REDIS_HOST;

const redis = require("redis");
const client = redis.createClient({ host: host });
client.on("error", function (err) {
  console.log("could not establish a connection with redis. " + err);
});
client.on("connect", function () {
  console.log("connected to redis successfully");
});

module.exports = client;
