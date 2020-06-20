// init.js connects DB, starts the app and import models.
import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();
// import Dotenv from "dotenv-webpack";

import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 5000;

function handleListening() {
  console.log("connected!");
}

app.listen(PORT, handleListening);
