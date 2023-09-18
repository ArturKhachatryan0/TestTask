import { createHash } from "node:crypto";
import { JWT } from "../config/index.js";
import usersService from "../services/users.js";
import jwtService from "../services/jwt.js";
import parseTokens from "../helpers/parseTokens.js";

const generateMD5 = (payload) => {
  return createHash("md5").update(payload).digest("hex");
};

const signIn = async (req, res) => {
  const md5Password = generateMD5(req.body.password);

  const user = await usersService.getUser({ id: req.body.id, password: md5Password });
  if (!user) return res.status(401).json("There aren't any user with same data");

  const accessToken = jwtService.generateAccessToken({ id: user.id });
  const refreshToken = jwtService.generateRefreshToken({ id: user.id });
  res.cookie("refreshToken", refreshToken, { expire: JWT.REFRESH_TOKEN.EXPIRES_IN * 1000 + Date.now(), httpOnly: true });
  res.json({ accessToken });
};

const newToken = (req, res) => {
  const { accessToken, refreshToken } = parseTokens(req);
  if (!(accessToken && refreshToken)) return res.status(403).json("Tokens required");
  const decodedRefreshToken = jwtService.decodeRefreshToken(refreshToken);
  if (decodedRefreshToken.error) return res.status(401).json("Invalid token");

  jwtService.addTokenToBlackList(accessToken, JWT.ACCESS_TOKEN.EXPIRES_IN);
  const newAccessToken = jwtService.generateAccessToken({ id: decodedRefreshToken.payload.id });
  res.json({ newAccessToken });
};

const signUp = async (req, res) => {
  const md5Password = generateMD5(req.body.password);

  // Return 409 status if user was already created
  const user = await usersService.getUser({ id: req.body.id });
  if (user) return res.status(409).json("User already exists");

  // Create a user and check if the user is created
  const { userCreated } = await usersService.createUser({ id: req.body.id, password: md5Password });
  if (!userCreated) return res.status(500).json("Internal error");

  // Get new created user and generate tokens
  const newUser = await usersService.getUser({ id: req.body.id });
  const accessToken = jwtService.generateAccessToken({ id: newUser.id });
  const refreshToken = jwtService.generateRefreshToken({ id: newUser.id });
  res.cookie("refreshToken", refreshToken, { expire: JWT.REFRESH_TOKEN.EXPIRES_IN * 1000 + Date.now(), httpOnly: true });
  res.json({ accessToken });
};

const logout = (req, res) => {
  const { accessToken, refreshToken } = parseTokens(req);
  res.clearCookie("refreshToken");
  jwtService.addTokenToBlackList(accessToken, JWT.ACCESS_TOKEN.EXPIRES_IN);
  jwtService.addTokenToBlackList(refreshToken, JWT.REFRESH_TOKEN.EXPIRES_IN);
  res.json({ status: "success" });
};

export default {
  signIn,
  newToken,
  signUp,
  logout,
};
