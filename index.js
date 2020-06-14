const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const session = require("express-session");
const RedisStore = require("connect-redis")(session);

const redisSecretKey = "maservuniqkey";

const host =
  process.env.dev === "development"
    ? process.env.LOCAL_REDIS_HOST
    : "10.130.3.164";

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
  })
);

let clearedMessage = "";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "pug");

app.get("/clear", function (req, res) {
  req.session.destroy();
  clearedMessage = "All API(s) Cleared! Thanks!";
  res.redirect("/");
});

app.get("/", (req, res) => {
  const sessionKey = `sess:${req.session.id}`;
  clearedMessage = "";
  // console.log("dev process", process.env.dev === "development");

  client.get(redisSecretKey, (err, data) => {
    let sessionUniqueObject =
      data &&
      Object.entries(JSON.parse(data)).reduce((obj, x, i) => {
        if (x[1].sessID === req.session.id) {
          obj[[x[0]]] = x[1];
        }

        return obj;
      }, {});

    if (sessionKey === "sess:" + req.session.id) {
      res.render("index", {
        session: sessionUniqueObject,
        clearedMessage,
      });
    } else {
      res.render("index", {
        session: {},
        clearedMessage,
      });
    }
  });
});

app.post("/submit", (req, res) => {
  const callName = Math.floor(Math.random() * 200) + 1;

  let formData = { jsonData: req.body.jsondata, sessID: req.session.id };

  client.get(redisSecretKey, (err, data) => {
    client.set(
      redisSecretKey,
      JSON.stringify({ ...JSON.parse(data), [callName]: formData }),
      (err, data) => {
        // console.log("data set", data);
      }
    );
  });

  res.redirect("/");
});

app.get("/app/:appurl", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  client.get(redisSecretKey, (err, data) => {
    res.send(JSON.parse(data)[req.params.appurl].jsonData);
  });
});

app.listen(8080, () => {
  console.log("server running on port 8080");
});
