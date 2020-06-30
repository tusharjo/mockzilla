const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({ credentials: true, origin: true }));

const session = require("express-session");
const RedisStore = require("connect-redis")(session);

const redisSecretKey = "maservuniqkey";

const host =
  process.env.dev === "development"
    ? "localhost"
    : process.env.OPENSHIFT_MOCKME_REDIS_HOST;

// Create redis client
const redis = require("redis");
const client = redis.createClient({ host: host });
client.on("error", function (err) {
  console.log("could not establish a connection with redis. " + err);
});
client.on("connect", function (err) {
  console.log("connected to redis successfully");
});

app.use(
  session({
    store: new RedisStore({ client: client }),
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: "none" },
  })
);

let clearedMessage = "";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../build")));

app.get("/clear", function (req, res) {
  req.session.destroy();
  clearedMessage = "All API(s) Cleared! Thanks!";
  res.redirect("/");
});

app.post("/app-submit", (req, res) => {
  const callName = Math.floor(Math.random() * 200) + 1;

  let formData = {
    jsonData: req.body.jsondata,
  };
  client.get(redisSecretKey, (err, data) => {
    client.set(
      redisSecretKey,
      JSON.stringify({ ...JSON.parse(data), [callName]: formData }),
      (err, data) => {
        if (err) {
          console.error("Error in submitting call");
        }
      }
    );
  });
  res.json({ call: callName, json: req.body.jsondata });
});

app.post("/app-update", (req, res) => {
  let formData = {
    jsonData: req.body.jsondata,
    callid: req.body.callid,
  };
  client.get(redisSecretKey, (err, data) => {
    client.set(
      redisSecretKey,
      JSON.stringify({ ...JSON.parse(data), [req.body.callid]: formData }),
      (err, data) => {
        if (err) {
          console.error("Error in updating call");
        }
      }
    );
  });
  res.json({ call: req.body.callid, json: req.body.jsondata });
});

app.post("/app-delete", (req, res) => {
  client.get(redisSecretKey, (err, data) => {
    let parsedData = JSON.parse(data);
    if (parsedData[req.body.callid]) {
      delete parsedData[req.body.callid];

      client.set(
        redisSecretKey,
        JSON.stringify({ ...parsedData }),
        (err, data) => {
          if (err) {
            console.error("Error in deleting call");
          }
        }
      );
      res.json({ call: req.body.callid, json: req.body.jsondata });
    } else {
      res.json({ error: "cannot delete" });
    }
  });
});

app.get("/app/:appurl", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  client.get(redisSecretKey, (err, data) => {
    if (JSON.parse(data)[req.params.appurl]) {
      res.send(JSON.parse(data)[req.params.appurl].jsonData);
    } else {
      res.status(404).send({ error: "No API call found!" });
    }
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.get("*", function (req, res) {
  res.status(404).send({ error: "Sorry, this is an invalid URL." });
});

app.listen(8080, () => {
  console.log("server running on port 8080");
});
