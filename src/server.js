import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://dev:PZg9GcAnB9fkee!@cluster0.ylvqlcd.mongodb.net/?retryWrites=true&w=majority",
    }),
  })
);

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
