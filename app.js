const express = require("express");
const cors = require("cors");
const routes = require("./Routes");
const path = require("path");
const bodyparser = require("body-parser");
const multer = require("multer");
// prepare

var app = express();

// content parsers
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(
  bodyparser.json({
    extended: true,
  })
);

app.use(multer({
  dest: './uploads/'
}).any());

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use("/", routes);

// Run

var PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`The server is running at port http://localhost:${PORT}`);
});