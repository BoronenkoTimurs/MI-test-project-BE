import express from "express";
import mongoose from "mongoose";
import { MONGOURL, PATH } from "./constants/const";
import postRouter from "./routes/post.routes";
import authRouter from "./routes/auth.routes";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routes/user.routes";

const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());
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
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", postRouter);

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
