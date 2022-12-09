const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const config = require("./config/key");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log("MongoDB CONNECTED..."))
  .catch((err) => console.log("Mongoose Connect ERROR", err));

app.use("/api/users", require("./routes/users"));
app.use("/api/tires", require("./routes/tires"));
app.use("/api/wheels", require("./routes/wheels"));
app.use("/api/requests", require("./routes/requests"));

app.get("/", (req, res) => {
  return res.send("hello~~ cskim speaking");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
