const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

let localSessionState = {};
let clearedMessage = "";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "pug");

app.get("/", function (req, res) {
  res.render("index", { session: localSessionState, clearedMessage });
  clearedMessage = "";
});

// Clear all apis
app.get("/clear", function (req, res) {
  localSessionState = {};
  clearedMessage = "All API(s) Cleared! Thanks!";
  res.redirect("/");
});

// Submit handler
app.post("/submit", function (req, res) {
  const callName = Math.floor(Math.random() * 200) + 1;
  localSessionState[callName] = req.body.jsondata;
  res.redirect("/");
});

// Call router
app.get("/app/:name", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  if (localSessionState[req.params.name]) {
    res.send(localSessionState[req.params.name]);
  } else {
    res.send({ error: "No API call found" });
  }
});

app.get("*", function (req, res) {
  res.send("Sorry, this is an invalid URL.");
});
app.listen(8080);
