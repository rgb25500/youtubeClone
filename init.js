import app from "./app";
// application 호출

const PORT = 5000;

function handleListening() {
  console.log("connected!");
}

app.listen(PORT, handleListening);
