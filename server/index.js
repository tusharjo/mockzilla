const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb" }));

const host =
  process.env.dev === "development"
    ? "redis-server"
    : process.env.OPENSHIFT_MOCKME_REDIS_HOST;

// Create redis client
const redis = require("redis");
const client = redis.createClient({ host: host });
client.on("error", function (err) {
  console.log("could not establish a connection with redis. " + err);
});
client.on("connect", function () {
  console.log("connected to redis successfully");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../build")));

app.get("/token", (req, res) => {
  res.json({ token: uuidv4() });
});

app.post("/app-fetch", (req, res) => {
  let url = req.body.fetchurl;
  const callName = Math.floor(Math.random() * 200) + 1;
  let mySessionKey = req.body.key;
  let statusCode;

  fetch(url)
    .then((resp) => {
      statusCode = resp.status;
      return resp.json();
    })
    .then((response) => {
      try {
        if (response) {
          client.hgetall(mySessionKey, function (err, obj) {
            let formJSONObject = {
              [callName]: JSON.stringify(response),
              [mySessionKey + "-" + callName + "-httpStatus"]: statusCode,
            };
            client.hmset(mySessionKey, { ...obj, ...formJSONObject });
            if (err) {
              console.error("Error in submitting call");
            }
          });
          return res.send({
            call: callName,
            json: response,
            status: statusCode,
          });
        } else {
          return res.status(404).send({ error: "Error in JSON" });
        }
      } catch (e) {
        res.status(404).send({ error: "Fetch Failed!" });
      }
    })
    .catch(() => res.status(404).send({ error: "Error in JSON" }));
});

app.post("/app-submit", (req, res) => {
  const callName = Math.floor(Math.random() * 200) + 1;
  let mySessionKey = req.body.key;
  let formJSONObject = {
    [callName]: req.body.jsondata,
    [mySessionKey + "-" + callName + "-httpStatus"]: req.body.httpStatus,
  };
  client.hgetall(mySessionKey, function (err, obj) {
    client.hmset(mySessionKey, { ...obj, ...formJSONObject });
    if (err) {
      console.error("Error in submitting call");
    }
  });
  res.json({
    call: callName,
    json: req.body.jsondata,
    status: req.body.httpStatus,
  });
});

app.post("/app-update", (req, res) => {
  let mySessionKey = req.body.key;
  let callid = req.body.callid;
  let formJSONObject = req.body.jsondata;

  client.hgetall(mySessionKey, function (err, obj) {
    client.hmset(mySessionKey, { ...obj, [callid]: formJSONObject });
    if (err) {
      console.error("Error in submitting call");
    }
  });

  res.json({ call: callid, json: formJSONObject });
});

app.post("/app-delete", (req, res) => {
  let mySessionKey = req.body.key;
  let callid = req.body.callid;
  client.hdel(mySessionKey, callid);
  client.hdel(mySessionKey, mySessionKey + "-" + callid + "-httpStatus");
  res.send({ call: callid });
});

app.get("/app/:key/:callid", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  client.hget(req.params.key, req.params.callid, function (err, obj) {
    client.hget(
      req.params.key,
      req.params.key + "-" + req.params.callid + "-httpStatus",
      function (err2, httpStatusCode) {
        try {
          if (httpStatusCode) {
            res.status(httpStatusCode).send(obj);
          } else if (obj) {
            res.send(obj);
          } else {
            res.status(404).send({ error: "No API call found!" });
          }
        } catch (e) {
          res.status(404).send({ error: "No API call found!" });
        }
      }
    );
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
