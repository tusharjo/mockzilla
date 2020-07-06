const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(cors({ credentials: true, origin: true }));

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
client.on("connect", function (err) {
  console.log("connected to redis successfully");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../build")));

function generateToken(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.get("/token", (req, res) => {
  let token = generateToken(20);
  res.json({ token });
});

app.post("/app-fetch", (req, res) => {
  let url = req.body.fetchurl;
  const callName = Math.floor(Math.random() * 200) + 1;
  let mySessionKey = req.body.key;

  fetch(url)
    .then((resp) => resp.json())
    .then((response) => {
      try {
        if (response) {
          client.hgetall(mySessionKey, function (err, obj) {
            let formJSONObject = {
              [callName]: JSON.stringify(response),
            };
            client.hmset(mySessionKey, { ...obj, ...formJSONObject });
            if (err) {
              console.error("Error in submitting call");
            }
          });
          return res.send({ call: callName, json: response });
        } else {
          return res.status(404).send({ error: "Error in JSON" });
        }
      } catch (e) {
        res.status(404).send({ error: "Fetch Failed!" });
      }
    })
    .catch((e) => res.status(404).send({ error: "Error in JSON" }));
});

app.post("/app-submit", (req, res) => {
  const callName = Math.floor(Math.random() * 200) + 1;
  let mySessionKey = req.body.key;
  let formJSONObject = {
    [callName]: req.body.jsondata,
  };
  client.hgetall(mySessionKey, function (err, obj) {
    client.hmset(mySessionKey, { ...obj, ...formJSONObject });
    if (err) {
      console.error("Error in submitting call");
    }
  });
  res.json({ call: callName, json: req.body.jsondata });
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
  let formJSONObject = req.body.jsondata;

  client.hgetall(mySessionKey, function (err, obj) {
    if (obj[callid]) {
      client.hdel(mySessionKey, callid);
      if (err) {
        console.error("Error in deleting call");
      }
      res.json({ call: callid, json: formJSONObject });
    } else {
      res.json({ error: "cannot delete" });
    }
  });
});

app.get("/app/:key/:callid", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  client.hgetall(req.params.key, function (err, obj) {
    if (obj) {
      res.send(obj[req.params.callid]);
    } else {
      res.status(404).send({ error: "No API call found!" });
    }
    if (err) {
      console.error("Error in getting call");
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
