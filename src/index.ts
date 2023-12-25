import express from "express";
import mongoose from "mongoose";
import { MONGOURL, PATH } from "./constants/const";
import exampleRouter from "./routes/exampleRoutes";

const app = express();

app.use(express.json());
app.use("/example", exampleRouter);
app.get("/", (req, res, next) => {
  res.send("I am the main page! (Without router)");
});

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log(`Webpage connected to database`);
    app.listen(PATH, () => {
      console.log(`Server is running on http:/localhost:${PATH}/`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
