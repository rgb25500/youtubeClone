// init.js connects DB, starts the app and import models.
import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";

const PORT = process.env.PORT || 5000;

function handleListening() {
  console.log("connected!");
}

app.listen(PORT, handleListening);
