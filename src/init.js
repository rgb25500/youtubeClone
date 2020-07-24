// init.js connects DB, starts the app and import models.
import "@babel/polyfill";
import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();
// import Dotenv from "dotenv-webpack";

import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 3000;

function handleListening() {
  console.log("connected!");
}

app.listen(PORT, handleListening);
