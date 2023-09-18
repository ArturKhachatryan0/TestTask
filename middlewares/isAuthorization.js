import jwtService from "../services/jwt.js";
import parseTokens from "../helpers/parseTokens.js";

const isAuthorization = (shouldTokensExists) => async (req, res, next) => {
  const { accessToken, refreshToken } = parseTokens(req);

  if (shouldTokensExists && !(accessToken && refreshToken)) return res.status(403).json("Tokens required");
  if (!shouldTokensExists && (accessToken || refreshToken)) return res.status(400).json("Should not have tokens");
  if (!shouldTokensExists && !accessToken && !refreshToken) return next();

  const decodedAccessToken = jwtService.decodeAccessToken(accessToken);
  const decodedRefreshToken = jwtService.decodeRefreshToken(refreshToken);

  const isAccessTokenInBlackList = await jwtService.isInBlackList(accessToken);
  const isRefreshTokenInBlackList = await jwtService.isInBlackList(refreshToken);

  if (isAccessTokenInBlackList || isRefreshTokenInBlackList || decodedAccessToken.error || decodedRefreshToken.error)
    return res.status(401).json("Invalid token");
  req.user = decodedAccessToken.payload.id;
  next();
};

export default isAuthorization;
