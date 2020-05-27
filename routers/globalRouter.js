import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  logout,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";

const globalRouter = express.Router();

// Home
globalRouter.get(routes.home, home);

// Search
globalRouter.get(routes.search, search);

// Join
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

// Login
globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);
globalRouter.get(routes.logout, logout);

export default globalRouter;
