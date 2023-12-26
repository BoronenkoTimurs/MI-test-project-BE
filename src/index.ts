import express from "express";
import mongoose from "mongoose";
import { MONGOURL, PATH, MONGOTUTORIADB } from "./constants/const";
import postRouter from "./routes/post.routes";
import authRouter from "./routes/auth.routes";

const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

app.use(express.json());
app.use(
  session({
    secret: "secret_key",
    store: MongoStore.create({
      mongoUrl: MONGOURL,
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use("/", postRouter);
app.use("/", authRouter);

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
