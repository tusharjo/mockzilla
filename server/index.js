const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb" }));
const {
  fetchJSONFromEndpoint,
  submitJSONCall,
  updateJSONCall,
  changeEndpoint,
  deleteAPI,
  customEndpoints,
  showJSONCall,
  generateToken,
} = require("./src/controller");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../build")));

app.post("/app-fetch", fetchJSONFromEndpoint);
app.post("/app-submit", submitJSONCall);
app.post("/app-update", updateJSONCall);
app.post("/change-endpoint", changeEndpoint);
app.post("/app-delete", deleteAPI);
app.get("/token", generateToken);
app.get("/custom/*", customEndpoints);
app.get("/app/:key/:callid", showJSONCall);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});
app.get("*", function (req, res) {
  res.status(404).send({ error: "Sorry, this is an invalid URL." });
});

app.listen(8080, () => {
  console.log("server running on port 8080");
});
