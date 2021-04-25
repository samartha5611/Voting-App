require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const handle = require("./handlers");
const routes = require("./routes");
const db = require("./models");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.get("/", (req, res) =>
  res.json({
    name: "samarth",
  })
);
app.use("/api/auth", routes.auth);
app.use("/api/polls", routes.poll);

app.use(handle.notFound);
app.use(handle.errorHandler);

app.listen(port, console.log(`Server has started on Port ${port}`));
