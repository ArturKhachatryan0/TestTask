import authorizationJoi from "../validation/authorization.js";
import joiMiddleware from "../helpers/joiToMidlewareWrapper.js";

export default {
  signIn: joiMiddleware(authorizationJoi.signInSchema),
  signUp: joiMiddleware(authorizationJoi.signUpSchema),
};
