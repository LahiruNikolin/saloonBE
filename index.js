const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { config } = require("dotenv");
const routesV1 = require("./src/routes/v1/index");
const app = express();
const port = 5000;

const corsOpts = {
  origin: "*",
  methods: ["GET, POST, PUT, DELETE", "PATCH"],
  allowedHeaders: ["Content-Type"],
};

config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors(corsOpts));
app.use("/api/v1", routesV1);

mongoose.connect("mongodb://127.0.0.1/ams", { useNewUrlParser: true });
mongoose.connection
  .once("open", function () {
    console.log("Database connected Successfully");
  })
  .on("error", function (err) {
    console.log("Error", err);
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
