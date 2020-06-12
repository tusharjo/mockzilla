const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
var session = require("express-session");
const cors = require("cors");
var app = express();

var sess = {
  secret: "keyboard cat",
  cookie: { secure: false },
  resave: true,
  saveUninitialized: true,
};

// app.set("trust proxy", 1); // trust first proxy
// sess.cookie.secure = true; // serve secure cookies

app.use(session(sess));
let clearedMessage = "";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "pug");

app.use(function (req, res, next) {
  if (!req.session.data) {
    req.session.data = {};
  }
  next();
});

app.get("/", function (req, res) {
  res.render("index", { session: req.session.data, clearedMessage });
  clearedMessage = "";
});

// Clear all apis
app.get("/clear", function (req, res) {
  req.session.data = {};
  clearedMessage = "All API(s) Cleared! Thanks!";
  res.redirect("/");
});

// Submit handler
app.post("/submit", function (req, res) {
  const callName = Math.floor(Math.random() * 200) + 1;
  req.session.data[callName] = req.body.jsondata;
  res.redirect("/");
});

// Call router
app.get("/app/:name", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req.session.data[req.params.name]) {
    res.send(req.session.data[req.params.name]);
  } else {
    res.send({ error: "No API call found!" });
  }
});

app.get("*", function (req, res) {
  res.send("Sorry, this is an invalid URL.");
});
app.listen(8080);
