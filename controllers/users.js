const getUserInfo = (req, res, next) => {
  res.json({ id: req.user });
};

export default {
  getUserInfo,
};
