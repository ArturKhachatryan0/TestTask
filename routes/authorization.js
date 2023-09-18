import authorizationController from "../controllers/authorization.js";
import authorizationValidation from "../middlewares/authorizationValidation.js";
import isAuthorization from "../middlewares/isAuthorization.js";

import { Router } from "express";
const authorizationRouter = Router();

authorizationRouter.post("/signin", isAuthorization(false), authorizationValidation.signIn, authorizationController.signIn);
authorizationRouter.post("/signup", isAuthorization(false), authorizationValidation.signUp, authorizationController.signUp);

authorizationRouter.post("/signin/new-token", authorizationController.newToken);
authorizationRouter.post("/logout", isAuthorization(true), authorizationController.logout);

export default authorizationRouter;
