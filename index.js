import express from "express";

const app = express();

const home = (req, res) => {
  res.send("Hello!!!");
};

app.get("/", home);
app.listen(5000);

// pull request
// SourceTree
