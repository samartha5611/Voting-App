const express = require("express");
const handle = require("./handlers");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./models");

const app = express();
const port = process.env.PORT;
// const db = require("./models");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) =>
  res.json({
    name: "samarth",
  })
);
app.use("/api/auth", routes.auth);
app.use(handle.notFound);

app.use(handle.errorHandler);

app.listen(port, console.log(`Server has started on Port ${port}`));
