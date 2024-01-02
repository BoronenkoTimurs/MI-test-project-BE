import express from "express";
import mongoose from "mongoose";
import { MONGOURL, PORT, NODE_ENV } from "./constants/const";
import postRouter from "./routes/post.routes";
import authRouter from "./routes/auth.routes";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routes/user.routes";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

if (NODE_ENV === "development") {
  app.use(morgan("tiny"));
  console.log(`Enviroment: ${NODE_ENV}`);
}

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
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", postRouter);

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log(`Webpage connected to database`);
    app.listen(PORT, () => {
      console.log(`Server is running on http:/localhost:${PORT}/`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

console.log(`Enviroment: ${NODE_ENV}`);
