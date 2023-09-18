const parseTokens = (req) => {
  const authorizationHeader = req.get("accessToken");
  const accessToken = authorizationHeader && authorizationHeader.split(" ")[1];
  const refreshToken = req.cookies.refreshToken;
  return { accessToken, refreshToken };
};

export default parseTokens;
