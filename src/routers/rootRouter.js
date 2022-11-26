import express from "express";
import multer from "multer";

const fs = require("fs");

import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.get("/search", search);

export const txtUpload = multer({
  dest: "uploads/txts/",
});

globalRouter.get("/txt", (req, res) => {
  fs.readdir("uploads/txts", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
    return res.render("txt", { list: data });
    // return res.send(data);
  });
  // return res.render("txt");
});

globalRouter.route("/read").post(txtUpload.single("txt"), (req, res) => {
  console.log(req.file.path);
  fs.readFile(req.file.path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    return res.send(data);
  });
});

globalRouter.get("/read/:id", (req, res) => {
  console.log(req.params);

  fs.readFile("uploads/txts/" + req.params.id, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    return res.send(data);
  });

  // return res.send("aa");
});

export default globalRouter;
