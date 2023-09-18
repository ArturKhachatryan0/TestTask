import usersController from "../controllers/users.js";
import isAuthorization from "../middlewares/isAuthorization.js";

import { Router } from "express";
const usersRouter = Router();

usersRouter.get("/info", isAuthorization(true), usersController.getUserInfo);

export default usersRouter;
