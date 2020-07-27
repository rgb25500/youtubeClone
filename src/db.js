import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(
    process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("connection success");
    console.log(typeof process.env.MONGO_URL_PROD);
  })
  .catch((err) => {
    console.log("err", err);
  });

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = (error) => console.log(`Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
