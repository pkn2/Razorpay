const express = require("express");
const bodyParser = require("body-parser");

const resroutes = require("./Routes/Route");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());

app.use("/", resroutes);

app.listen(8080, () => {
  console.log("server running at port 8080");
});
